import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_TOKEN,
    {
      expiresIn: "10d",
    }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,      // localhost ke liye false
    sameSite: "lax",    // localhost ke liye lax
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
};

export default createTokenAndSaveCookie;