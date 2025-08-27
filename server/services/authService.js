import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import passport from 'passport';

const register = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return user;
}

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return { accessToken, refreshToken, user: userWithoutPassword };
}

const getProfile = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

const refreshAccessToken = (token) => {
    const { userId } = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return newAccessToken;
}

const loginWithFacebook = async () => {
    passport.authenticate('facebook', {scope: ['displayName', 'emails', 'photos']});
}

const facebookCallback = async (req, res) => {
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    };
}

const authService = {
    register,
    login,
    getProfile,
    refreshAccessToken,
    loginWithFacebook
}

export default authService;