const Game = require('../models/Game');

exports.createGame = async (req, res) => {
  try {
    const game = new Game();
    await game.save();
    return res.status(201).json(game);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    return res.json(game);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
