import jwt from "jsonwebtoken";

const generateToken = userId => {
  return jwt.sign({ userId }, "mySecret", {
    expiresIn: "7 days"
  });
};

export { generateToken as default };
