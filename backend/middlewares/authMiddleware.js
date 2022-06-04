const expressAsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      console.log(req.user._id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Unauthorized, token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Unauthorized, no token provided');
  }
});

module.exports = { protect };