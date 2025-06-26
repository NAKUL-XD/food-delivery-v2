import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // ✅ Accept token from 'Authorization: Bearer <token>'
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, login again!",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; // attach userId to req
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token, login again!",
    });
  }
};

export default authMiddleware;
