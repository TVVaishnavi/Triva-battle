import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Summary.css";

function RoundSummary({
  round,
  player1Name,
  player2Name,
  player1Score,
  player2Score,
  usedCategory,
  totalCategories,
  setRound
}) {
  const navigate = useNavigate();

  const noCategoriesLeft = usedCategory.length >= totalCategories;

  const handleNextRound = () => {
    setRound(prev => prev + 1);
    navigate("/category");
  };

  const handleEndGame = () => {
    navigate("/final");
  };

  return (
    <div className="round-summary-screen">
      <h2>Round {round} Summary</h2>

      <div className="round-summary-card">
        <p>{player1Name}: <strong>{player1Score}</strong></p>
        <p>{player2Name}: <strong>{player2Score}</strong></p>
      </div>

      <div className="round-summary-buttons">
        <button
          className="next-round-btn"
          onClick={handleNextRound}
          disabled={noCategoriesLeft}
        >
          Next Round
        </button>

        <button
          className="end-game-btn"
          onClick={handleEndGame}
        >
          End Game
        </button>
      </div>

      {noCategoriesLeft && (
        <p className="round-info-text">
          No categories left. Please end the game.
        </p>
      )}
    </div>
  );
}

export default RoundSummary;
