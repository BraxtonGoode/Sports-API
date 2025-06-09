const express = require('express');
const router = express.Router();
const volleyballController = require('../controllers/volleyballController.js');
const { saveTeam, validateId } = require('../middleware/validator');


/// GET all volleyball teams
router.get('/', volleyballController.getAllTeams);

// GET a single volleyball team by ID
router.get('/:id', validateId, volleyballController.getTeamById);

// POST a new volleyball team 
router.post('/', saveTeam, volleyballController.createTeam);

// PUT to update an existing volleyball team 
router.put('/:id', validateId, saveTeam,  volleyballController.updateTeam);

// DELETE a volleyball team 
router.delete('/:id', validateId, volleyballController.deleteTeam);

module.exports = router;