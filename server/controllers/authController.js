import authService from "../services/authService.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.register(username, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await authService.login(
      email,
      password
    );
    res
      .status(200)
      .json({ message: "Login successful", accessToken, refreshToken, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ error: "Refresh token is required" });
  }
  try {
    const newAccessToken = authService.refreshAccessToken(token);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
};

const loginWithFacebook = async (req, res) => {
  try {
    const authUrl = await authService.getFacebookAuthUrl(req, res);
    res.redirect(authUrl);
  } catch (error) {
    res.status(500).json({ error: "Facebook login redirect failed", detail: error.message });
  }
};

const facebookCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const savedState = req.cookies["fb_oauth_state"];
    if (!state || state !== savedState) return res.status(400).send("Bad state");

    const { accessToken, refreshToken, user } = await authService.handleFacebookCallback(code);
    res.status(200).json({ accessToken, refreshToken, user });
  } catch (error) {
    res.status(500).json({ error: "Facebook login failed", detail: error.message });
  }
};

const authController = {
  register,
  login,
  getProfile,
  refreshToken,
  loginWithFacebook,
  facebookCallback,
};

export default authController;
