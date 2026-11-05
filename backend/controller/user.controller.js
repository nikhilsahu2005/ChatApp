import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generatetoken.js";
export const signup = async (req, res) => {
  let stage = "reading signup data";
  try {
    const { fullname, email, password, confirmPassword } = req.body ?? {};
    if (
      typeof fullname !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !fullname.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const normalizedEmail = email.trim().toLowerCase();
    stage = "checking email";
    const user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }
    // Hashing the password
    stage = "hashing password";
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email: normalizedEmail,
      password: hashPassword,
    });
    stage = "saving user";
    await newUser.save();
    stage = "creating login cookie";
    createTokenAndSaveCookie(newUser._id, res);
    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup failed:", { stage, name: error.name, code: error.code });
    if (error.code === 11000) {
      return res.status(409).json({ error: "User already registered" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Please check the signup details" });
    }
    if (["MongooseServerSelectionError", "MongoNetworkError"].includes(error.name)) {
      return res.status(503).json({ error: "Database connection failed; check backend logs" });
    }
    return res.status(500).json({
      error: "Internal server error",
      diagnostic: `${stage} (${error.name || "UnknownError"})`,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ error: "Invalid user credential" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }
    createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};
