import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(user.toJSON ? user.toJSON() : user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60s",
  });
};

export default generateAccessToken;
