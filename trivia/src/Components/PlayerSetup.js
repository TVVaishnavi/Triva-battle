import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Player.css";

function PlayerSetup({ setPlayer1, setPlayer2 }) {
  const [player1, setLocalPlayer1] = useState("");
  const [player2, setLocalPlayer2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (player1.trim() === "" || player2.trim() === "") {
      setError("Both player names are required");
      return;
    }

    if (player1.trim().toLowerCase() === player2.trim().toLowerCase()) {
      setError("Player names must be unique");
      return;
    }

    setPlayer1(player1.trim());
    setPlayer2(player2.trim());

    navigate("/category");
  };

  return (
    <div className="player-screen">
      <div className="player-card">
        <h2>Enter Player Names</h2>

        <label>Player 1</label>
        <input
          type="text"
          value={player1}
          placeholder="Enter Player 1 name"
          onChange={(e) => {
            setLocalPlayer1(e.target.value) 
            setError("")
          }}

        />

        <label>Player 2</label>
        <input
          type="text"
          value={player2}
          placeholder="Enter Player 2 name"
          onChange={(e) => {
            setLocalPlayer2(e.target.value) 
            setError("")
          }}
        />

        {error && <p className="error-text">{error}</p>}

        <button
          className="start-btn"
          onClick={handleSubmit}
          disabled={!player1 || !player2}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default PlayerSetup;
