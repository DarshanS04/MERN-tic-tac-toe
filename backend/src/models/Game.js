const mongoose = require('mongoose');

const { Schema } = mongoose;

const GameSchema = new Schema({
  players: [{
    id: { type: String },     // socket id or generated id
    name: { type: String },
    symbol: { type: String, enum: ['X','O'] }
  }],
  board: { type: [String], default: Array(9).fill(null) }, // 0..8
  turn: { type: String, enum: ['X','O'], default: 'X' },
  status: { type: String, enum: ['waiting','playing','finished'], default: 'waiting' },
  winner: { type: String, enum: ['X','O','draw',null], default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);
