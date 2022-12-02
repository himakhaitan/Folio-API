const jwt = require("jsonwebtoken");

const authMiddleware = (role) => {
  return (req, res, next) => {
    try {
        
      // Generating Token
      const token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

      // Checking for the valid role
      if (!role.includes(decodedToken.role)) {
        res.status(401).json({
          message: "Invalid Role",
          success: false,
        });
      } else {
        // Adding Data to Request Body
        req.userData = {
          email: decodedToken.email,
          userId: decodedToken.username,
          role: decodedToken.role,
        };
        next();
      }
    } catch (err) {
      res.status(401).json({ message: "Auth failed!", success: false });
    }
  };
};

module.exports = authMiddleware;
