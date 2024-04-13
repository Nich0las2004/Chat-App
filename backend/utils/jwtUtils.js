import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });
};

export default generateAccessToken;
