import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_TOKEN,
    {
      expiresIn: "10d",
    }
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
};

export default createTokenAndSaveCookie;