const express = require('express');
const router = express.Router();
const basketballController = require('../controllers/basketballController');
const { checkAdmin } = require('../middleware/auth');

// Public routes
router.get('/', basketballController.getAllBasketballs);
router.get('/:id', basketballController.getBasketballById);

// Admin-protected routes
router.post('/', checkAdmin, basketballController.createBasketball);
router.put('/:id', checkAdmin, basketballController.updateBasketball);
router.delete('/:id', checkAdmin, basketballController.deleteBasketball);

module.exports = router;