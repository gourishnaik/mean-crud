const express = require('express');

const router = express.Router(); // i have regitred routes below
const {
    createUser,
    findUserById,
    updateUserById,
    deleteUserById,
    getAllUsers,
  } = require('../controllers/usercontroller');


// creation of user

router.post('/CreateContact', createUser); // Create user
router.get('/findbyid/:id', findUserById);              // Get user by ID
router.put('/updatebyid/:id', updateUserById); // Update user by ID
router.delete('/deletebyid/:id', deleteUserById);       // Delete user by ID
router.get('/getallusers', getAllUsers);                   // Get all users

module.exports = router; // we need to export so other an use