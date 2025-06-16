const Basketball = require('../models/basketball');

exports.getAllBasketballs = async (req, res) => {
  const basketballs = await Basketball.find();
  res.json(basketballs);
};

exports.getBasketballById = async (req, res) => {
  const basketball = await Basketball.findById(req.params.id);
  if (!basketball) return res.status(404).json({ message: 'Not found' });
  res.json(basketball);
};

exports.createBasketball = async (req, res) => {
  const basketball = new Basketball(req.body);
  await basketball.save();
  res.status(201).json(basketball);
};

exports.updateBasketball = async (req, res) => {
  const basketball = await Basketball.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!basketball) return res.status(404).json({ message: 'Not found' });
  res.json(basketball);
};

exports.deleteBasketball = async (req, res) => {
  const basketball = await Basketball.findByIdAndDelete(req.params.id);
  if (!basketball) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
};