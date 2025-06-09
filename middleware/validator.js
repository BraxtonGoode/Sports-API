const validator = require('../helpers/validate');
const { ObjectId } = require('mongodb');

const saveTeam = (req, res, next) => {
  const validationRule = {
    teamName: 'required|string',
    overallScore: 'required|string',
    streak: 'required|integer',
    location: 'required|string',
    playerCount: 'required|integer',
    coach: 'required|string',
    colors: 'required|string',
  };
  
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


const validateId = (req, res, next) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format. Must be a valid MongoDB ObjectId.'
    });
  }

  next();
};


module.exports = {
  saveTeam,
  validateId
};