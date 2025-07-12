// backend/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUsers, deleteUser, updateUser, } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, getUsers); // protected
router.delete('/:id', protect, deleteUser);
router.put('/:id', protect, updateUser);


module.exports = router;
