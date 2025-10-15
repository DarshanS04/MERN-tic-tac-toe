require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const connectDB = require('./config/db');
const Game = require('./models/Game');
const checkWinner = require('./utils/checkWinner');

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGO_URI);

const server = http.createServer(app);

// socket.io server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || '*'
  }
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // join a game room
  socket.on('join', async ({ gameId, name }, ack) => {
    try {
      const game = await Game.findById(gameId);
      if (!game) return ack({ status: 'error', message: 'Game not found' });

      // prevent more than 2 players
      if (game.players.length >= 2 && !game.players.find(p => p.id === socket.id)) {
        return ack({ status: 'error', message: 'Game full' });
      }

      // if player already registered, update name
      let player = game.players.find(p => p.id === socket.id);
      if (!player) {
        // assign symbol
        const used = game.players.map(p => p.symbol);
        const symbol = used.includes('X') ? 'O' : 'X';
        player = { id: socket.id, name: name || 'Player', symbol };
        game.players.push(player);
      } else {
        player.name = name || player.name;
      }

      // update status
      if (game.players.length === 2) game.status = 'playing';
      await game.save();

      socket.join(gameId);

      // inform room
      io.to(gameId).emit('game:update', game);
      ack({ status: 'ok', game });
    } catch (err) {
      console.error(err);
      ack({ status: 'error', message: 'Server error' });
    }
  });

  socket.on('move', async ({ gameId, index }, ack) => {
    try {
      const game = await Game.findById(gameId);
      if (!game) return ack({ status: 'error', message: 'Game not found' });
      if (game.status !== 'playing') return ack({ status: 'error', message: 'Game not playable' });

      // find player symbol
      const player = game.players.find(p => p.id === socket.id);
      if (!player) return ack({ status: 'error', message: 'Join game first' });

      // validate turn & move
      if (game.board[index]) return ack({ status: 'error', message: 'Cell occupied' });
      if (game.turn !== player.symbol) return ack({ status: 'error', message: 'Not your turn' });

      game.board[index] = player.symbol;
      // swap turn
      game.turn = game.turn === 'X' ? 'O' : 'X';

      const winner = checkWinner(game.board);
      if (winner) {
        game.status = 'finished';
        game.winner = winner === 'draw' ? 'draw' : winner;
      }
      await game.save();

      io.to(gameId).emit('game:update', game);
      ack({ status: 'ok', game });
    } catch (err) {
      console.error(err);
      ack({ status: 'error', message: 'Server error' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id);
    // for demo simplicity we don't auto-remove players here; you could implement cleanup
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
