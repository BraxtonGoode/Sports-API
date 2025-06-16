const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkAdmin } = require('../middleware/auth');

// Public routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

// Admin-protected routes
router.post('/', checkAdmin, userController.createUser);
router.put('/:id', checkAdmin, userController.updateUser);
router.delete('/:id', checkAdmin, userController.deleteUser);

module.exports = router;