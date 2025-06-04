const mongoDb = require('../DB/connect.js');
const objectId = require('mongodb').ObjectId;

const getAllTeams = async (req, res) => {
  try {
    const db = await mongoDb.getDb().collection('volleyballTeams').find();
    const volleyballTeams = await db.toArray();
    res.header('Content-Type', 'application/json');
    res.status(200).json(volleyballTeams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
};

const getTeamById = async (req, res) => {
  try {
    const teamId = new objectId(req.params.id);
    const db = await mongoDb
      .getDb()
      .collection('volleyballTeams')
      .findOne({ _id: teamId });
    if (!db) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.header('Content-Type', 'application/json');
    res.status(200).json(db);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team', error });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const teamId = new objectId(req.params.id);
    const db = await mongoDb
      .getDb()
      .collection('volleyballTeams')
      .deleteOne({ _id: teamId });
    if (db.deletedCount === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.header('Content-Type', 'application/json');
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team', error });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  deleteTeam,
};
