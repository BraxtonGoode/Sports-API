const mongoDb = require('../DB/connect.js'); 
const objectId = require('mongodb').ObjectId; 

/**

 * @param {Object} req 
 * @param {Object} res 
 */
const getAllTeams = async (req, res) => {
  try {
   res.header('Content-Type', 'application/json');     
   res.status(200).json(basketballTeams); 
  } catch (error) {
   
    console.error('Error fetching all Basketball teams:', error);
    res.status(500).json({ message: 'Error fetching Basketball teams', error: error.message || error });
  }
};

/**
 * 
 * @param {Object} req  
 * @param {Object} res .
 */
const getTeamById = async (req, res) => {
  try {
    
    if (!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Team ID format provided.' });
    }
    const teamId = new objectId(req.params.id);

    const team = await mongoDb.getDb().collection('Basketball').findOne({ _id: teamId });
    
    if (!team) {
      return res.status(404).json({ message: 'Basketball team not found' }); // 404 if no team found
    }
    res.header('Content-Type', 'application/json');
    res.status(200).json(team); 
  } catch (error) {
    console.error('Error fetching Basketball team by ID:', error);
    res.status(500).json({ message: 'Error fetching Basketball team', error: error.message || error });
  }
};
/**
 
 * @param {Object} req
 * @param {Object} res 
 */
const createTeam = async (req, res) => {
  try {
   
    const team = {
      name: req.body.name,
      record: req.body.record,
      location: req.body.location,
      players: req.body.players, 
      colors: req.body.colors,   
      headCoach: req.body.headCoach,
      streak: req.body.streak,
      
    };

    
    const response = await mongoDb.getDb().collection('Basketball').insertOne(team);
    
    
    if (response.acknowledged) {
      res.header('Content-Type', 'application/json');
      
      res.status(201).json({ 
        message: 'Basketball team created successfully', 
        id: response.insertedId,
        team: team 
          });
    } else {
      res.status(500).json({ message: 'Basketball team creation failed' });
    }
  } catch (error) {
    console.error('Error creating Basketball team:', error);
    res.status(500).json({ message: 'Error creating Basketball team', error: error.message || error });
  }
};

 
const updateTeam = async (req, res) => {
  try {
    
    if (!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Team ID format provided for update.' });
    }
    const teamId = new objectId(req.params.id);

 const updateDoc = {};
    for (const key in req.body) {
        
        if (['name', 'record', 'location', 'players', 'colors', 'headCoach', 'streak'].includes(key)) {
            updateDoc[key] = req.body[key];
        }
    }

    
    if (Object.keys(updateDoc).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update.' });
    }

    
    const response = await mongoDb.getDb()
      .collection('Basketball')
      .updateOne({ _id: teamId }, { $set: updateDoc });
    
    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Basketball team not found for update.' });
    }
    
    if (response.modifiedCount === 0 && response.matchedCount === 1) {
        
        return res.status(200).json({ message: 'Basketball team found but no changes applied (data was identical).'});
    }

    res.header('Content-Type', 'application/json');
    res.status(200).json({ message: 'Basketball team updated successfully', modifiedCount: response.modifiedCount });
  } catch (error) {
    console.error('Error updating Basketball team:', error);
    res.status(500).json({ message: 'Error updating Basketball team', error: error.message || error });
  }
};

/**
 
 * @param {Object} req 
 * @param {Object} res 
 */
const deleteTeam = async (req, res) => {
  try {

    if (!objectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Team ID format provided for deletion.' });
    }
    const teamId = new objectId(req.params.id);

    
    const response = await mongoDb.getDb().collection('Basketball').deleteOne({ _id: teamId });
    
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Basketball team not found for deletion.' }); // 404 if no team deleted
    }
    res.header('Content-Type', 'application/json');
    res.status(200).json({ message: 'Basketball team deleted successfully', deletedCount: response.deletedCount });
  } catch (error) {
    console.error('Error deleting Basketball team:', error);
    res.status(500).json({ message: 'Error deleting Basketball team', error: error.message || error });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
