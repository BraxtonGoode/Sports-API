/ routes/basketball.js
const express = require('express').Router();

// Import the Basketball controller functions
const basketballController = require('../controllers/basketball');


const { isAuthenticated } = require('../middleware/validator'); 


const { validateBasketballTeamCreation,  validateBasketballTeamUpdate } = require('../middleware/validate'); 

// --- Public Routes ---

// GET /basketball
// Retrieves all Basketball teams.
router.get('/', basketballController.getAllTeams);

// GET /basketball/:id

router.get('/:id', basketballController.getTeamById);


// --- Protected Routes ---
router.post('/',isAuthenticated, validateBasketballTeamCreation, basketballController.createTeam 
);

router.put('/:id', isAuthenticated, validateBasketballTeamUpdate, basketballController.updateTeam 
);


router.delete('/:id', isAuthenticated,basketballController.deleteTeam );

module.exports = router;
