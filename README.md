# 🎮 Real-Time Tic-Tac-Toe (MERN Stack + Socket.io)

A **real-time multiplayer Tic-Tac-Toe game** built using the **MERN Stack** with **Socket.io** for instant communication between players.  
Beautiful, responsive UI built with **React + Vite**, and backend powered by **Express + MongoDB + Socket.io**.

---

## 🚀 Features

- 🔥 Real-time gameplay using **WebSockets (Socket.io)**
- 🧠 Smart turn-based logic with instant UI updates
- 🎨 Clean, modern, and responsive UI
- 🧍 Multiplayer support (2 players per room)
- 💾 MongoDB-based game state persistence
- 🔗 Game sharing via unique room links
- 🧰 Fully modular and scalable MERN architecture

---

## 🏗️ Tech Stack

| Layer       | Technology                             |
|------------|----------------------------------------|
| **Frontend** | React + Vite + Axios + Socket.io-client |
| **Backend**  | Node.js + Express + Socket.io           |
| **Database** | MongoDB (Mongoose ORM)                  |
| **Styling**  | CSS3 (Poppins, Flex/Grid)               |
| **Runtime**  | Node.js (v18+)                          |
| **Package Manager** | npm / yarn                        |

---

---

## ⚙️ Setup & Installation

### 🧩 Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
Install dependencies:

npm install


Create a .env file:

PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/tictactoe
CLIENT_URL=http://localhost:5173


Start the backend:

npm run dev
# or
node server.js


Your backend should now be running at 👉 http://localhost:4000

🧠 Frontend Setup

Open a new terminal and navigate to the frontend:

cd frontend


Install dependencies:

npm install


Create a .env file:

VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000


Run the frontend:

npm run dev


Your frontend will now run at 👉 http://localhost:5173

🕹️ How to Play
👤 Player 1

Go to http://localhost:5173

Enter your name and click Create Game

Copy the Game Link (URL) shown on screen

Wait for your opponent to join

👥 Player 2

Open the shared game link from Player 1

Enter your name and join the game

Start playing in real-time 🎯

✅ The board updates instantly for both players
✅ Turn-based logic is handled by the backend
✅ Winner and draw detection are built-in


🧰 API Endpoints
Method	Endpoint	Description
POST	/api/games	Create a new game
GET	/api/games/:id	Get existing game by ID
PUT	/api/games/:id/move	Make a move
⚡ Socket.io Events
Event	Direction	Description
join	Client → Server	Player joins a game room
move	Client → Server	Player makes a move
game:update	Server → Client	Updated game state broadcast
disconnect	Auto	Player disconnects gracefully
🌟 Future Enhancements

🕹 Restart game button

💬 In-game chat

🧠 AI Mode (Single Player)

🕵️ Spectator support

🔐 Authentication (Firebase / JWT)

🌐 Deployment on Vercel + Render


🧑‍💻 Author
Darshan Saravari
🚀 Software Developer | Tech Enthusiast