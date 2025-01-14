const User = require('../models/contactmodel');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;
    const user = new User({ firstName, lastName, email, phoneNumber });
    await user.save();
    res.status(201).json({ message: 'User successfully created', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while creating user' });
  }
};

// Get a specific user by ID
const findUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, phoneNumber } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, phoneNumber },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  findUserById,
  updateUserById,
  deleteUserById,
  getAllUsers,
};
