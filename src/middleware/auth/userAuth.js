// authMiddleware.js
const jwt = require("jsonwebtoken");

const useAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const secret=process.env.JWT_SECRET;

  // 1. Check if Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ err: "Unauthorized: Missing or malformed token" });
  }

  // 2. Extract token from header
  const token = authHeader.split(" ")[1];

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(403).json({ err: "Invalid or expired token" });
  }
};

module.exports = useAuthMiddleware;
