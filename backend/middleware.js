const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(411).json({
            msg: "Invalid credentials"
        });
    }

    // Corrected: Split using a space instead of an empty string
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Error while verifying JWT token"
        });
    }
};

module.exports = { authMiddleware };
