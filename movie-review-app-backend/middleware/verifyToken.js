const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  // console.log(token);

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated" });
  }

  const secret = process.env.SECRET;

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = user;
    next();
  });
};

const verifyUser = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json({ message: "You are not authorized" });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json({ message: "You are not authorized, admin" });
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
