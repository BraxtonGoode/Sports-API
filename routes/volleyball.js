const express = require('express');
const router = express.Router();
const volleyballController = require('../controllers/volleyballController');

// Get all Routes
router.get('/', volleyballController.getAllTeams);
router.get('/:id', volleyballController.getTeamById);

// POST, PUT, DELETE request for volleyball teams
router.post('/', volleyballController.createTeam); // create controller
router.put('/:id', volleyballController.updateTeam); // create controller
router.delete('/:id', volleyballController.deleteTeam);
module.exports = router;
