import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import PlayerSetup from './Components/PlayerSetup';
import Category from './Components/Category';
import Question from './Components/Question';
import Summary from './Components/Summary';
import Final from './Components/Final';

function App() {
  const [usedCategory, setUsedCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [round, setRound] = useState(1);

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<PlayerSetup
          setPlayer1={setPlayer1}
          setPlayer2={setPlayer2}
        />} />
        <Route path='/category' element={<Category
          usedCategory={usedCategory}
          setSelectedCategory={setSelectedCategory}
          round={round}
        />} />
        <Route path='/play' element={<Question
          player1Name={player1}
          player2Name={player2}
          player1Score={player1Score}
          setPlayer1Score={setPlayer1Score}
          player2Score={player2Score}
          setPlayer2Score={setPlayer2Score}
          selectedCategory={selectedCategory}
          usedCategory={usedCategory}
          setUsedCategory={setUsedCategory}
          round={round}
          setRound={setRound}
        />} />
        <Route
          path="/summary"
          element={
            <Summary
              round={round}
              setRound={setRound}
              usedCategory={usedCategory}   
              totalCategories={10}
              player1Name={player1}
              player2Name={player2}
              player1Score={player1Score}
              player2Score={player2Score}
            />
          }
        />
        <Route
          path='/final'
          element = {
            <Final
              player1Name={player1}
              player2Name={player2}
              player1Score = {player1Score}
              player2Score = {player2Score}
            />
          }
        />

      </Routes>
    </div>
  )
}

export default App;
