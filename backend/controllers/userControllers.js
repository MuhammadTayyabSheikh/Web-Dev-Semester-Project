const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, img } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    img
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      img: user.img,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Error Occurred! User could not be created');
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.isValidPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      img: user.img,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.img = req.body.img || user.img;

    if(req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      img: updatedUser.img,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

module.exports = { registerUser, authUser, updateUserProfile };