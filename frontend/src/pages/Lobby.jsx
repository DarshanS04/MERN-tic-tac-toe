import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Lobby() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const createGame = async () => {
    try {
      const res = await API.post("/games");
      const gameId = res.data._id;
      navigate(`/game/${gameId}`, { state: { name } });
    } catch (err) {
      console.error(err);
      alert("Could not create game");
    }
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe — Lobby</h1>
      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createGame}>Create Game</button>
      <p style={{ marginTop: "12px", color: "#475569" }}>
        Or join an existing game by pasting its link.
      </p>
    </div>
  );
}
