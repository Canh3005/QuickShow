import authService from "../services/authService.js";
import jwt from "jsonwebtoken";

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
    res
      .status(403)
      .json({ error: "Invalid refresh token", detail: error.message });
  }
};

const loginWithFacebook = async (req, res) => {
  try {
    const authUrl = await authService.getFacebookAuthUrl(req, res);
    res.redirect(authUrl);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Facebook login redirect failed", detail: error.message });
  }
};

const facebookCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    console.log(state);
    if (!code || !state) {
      return res.status(400).send("Missing code or state");
    }

    // Verify JWT
    try {
      // eslint-disable-next-line no-undef
      const decoded = jwt.verify(state, process.env.JWT_SECRET);
      if (decoded.type !== "facebook_auth") {
        return res.status(400).send("Invalid state");
      }
    } catch (err) {
      console.error(err);
      return res.status(400).send("Invalid or expired state");
    }

    const { accessToken, refreshToken, user } =
      await authService.handleFacebookCallback(code);
    // Redirect về FE với token trong query param
    // eslint-disable-next-line no-undef
    const FE_URL = process.env.FE_URL;
    const redirectUrl = `${FE_URL}/auth/facebook/success?accessToken=${accessToken}&refreshToken=${refreshToken}&user=${encodeURIComponent(
      JSON.stringify(user)
    )}`;
    return res.redirect(redirectUrl);
  } catch (error) {
    return res.redirect(
      // eslint-disable-next-line no-undef
      `${process.env.FE_URL}/auth/facebook/error?message=${error.message}`
    );
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
