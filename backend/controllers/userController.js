// backend/controllers/userController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// Register new user
// POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, city, country, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    city,
    country,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      country: user.country,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


// Login user
// POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  city: user.city,
  country: user.country,
  role: user.role,
  token: generateToken(user._id),
});

  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Get all users (protected)
// GET /api/users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//  Delete user by ID
//  DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.deleteOne(); // or user.remove() in older Mongoose versions

  res.json({ message: 'User deleted successfully' });
});

// Update user by ID
// PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, phone, city, country, role } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.city = city || user.city;
  user.country = country || user.country;
  user.role = role || user.role;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    city: updatedUser.city,
    country: updatedUser.country,
    role: updatedUser.role,
  });
});



module.exports = {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
  updateUser,
};
