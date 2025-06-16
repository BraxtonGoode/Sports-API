const mongoose = require('mongoose');
const basketballSchema = new mongoose.Schema({
  name: String,
  team: String,
  points: Number,
  rebounds: Number,
  assists: Number,
});
module.exports = mongoose.model('Basketball', basketballSchema);