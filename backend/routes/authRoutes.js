const router = require('express').Router();
const { register, login } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // ✅ ADD THIS
const { getUsers } = require('../controllers/userController');

router.get('/users', protect, getUsers);
router.post('/register', register);
router.post('/login', login);


module.exports = router;
