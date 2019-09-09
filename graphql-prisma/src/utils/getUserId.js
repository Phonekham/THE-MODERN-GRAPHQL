import jwt from "jsonwebtoken";

const getUserId = (request, requireAuth = true) => {
  const header = request.request.headers.authorization;
  if (header) {
    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, "mySecret");
    return decoded.userId;
  }
  if (requireAuth) {
    throw new Error("Authorization required ");
  }
  return null;
};

export { getUserId as default };
