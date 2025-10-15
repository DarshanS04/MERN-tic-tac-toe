const express = require('express');
const cors = require('cors');
const gamesRouter = require('./routes/games');

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

app.use('/api/games', gamesRouter);

app.get('/', (_, res) => res.send('TicTacToe API'));
module.exports = app;
