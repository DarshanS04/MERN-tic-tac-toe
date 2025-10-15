import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../api/api";
import Board from "../components/Board";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

export default function GamePage() {
  const { id } = useParams();
  const location = useLocation();
  const nameFromState =
    location.state?.name || `Player-${Math.floor(Math.random() * 1000)}`;
  const [game, setGame] = useState(null);
  const [name] = useState(nameFromState);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
    const socket = socketRef.current;

    socket.on("connect", () => {
      socket.emit("join", { gameId: id, name }, (res) => {
        if (res.status === "ok") {
          setGame(res.game);
        } else {
          alert(res.message || "Join failed");
        }
      });
    });

    socket.on("game:update", (g) => {
      setGame(g);
    });

    return () => {
      socket.disconnect();
    };
  }, [id, name]);

  const handleCellClick = (index) => {
    if (!socketRef.current) return;
    socketRef.current.emit("move", { gameId: id, index }, (res) => {
      if (res.status !== "ok") {
        console.warn(res.message);
      }
    });
  };

  if (!game) return <div className="container">Loading…</div>;

  const myPlayer = game.players.find((p) => p.id === socketRef.current.id);
  const mySymbol = myPlayer?.symbol ?? "?";
  const statusText =
    game.status === "waiting"
      ? "Waiting for opponent..."
      : game.status === "playing"
      ? `${game.turn}'s turn`
      : game.winner === "draw"
      ? "It's a draw!"
      : `${game.winner} wins!`;

  const disabled = game.status !== "playing" || game.turn !== mySymbol;

  return (
    <div className="container">
      <h2>Tic Tac Toe</h2>
      <div>Game ID: {id}</div>
      <div>
        You: <strong>{name}</strong> ({mySymbol})
      </div>

      <ul>
        {game.players.map((p) => (
          <li key={p.id}>
            {p.name} — <strong>{p.symbol}</strong>
          </li>
        ))}
      </ul>

      <Board board={game.board} onCellClick={handleCellClick} disabled={disabled} />
      <div className="status">{statusText}</div>
    </div>
  );
}
