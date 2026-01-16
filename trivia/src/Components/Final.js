import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Final.css';

function Final({ player1Name, player2Name, player1Score, player2Score}){
    const navigate = useNavigate();

    let resultText = 'Its a draw!';

    if(player1Score > player2Score){
        resultText = `${player1Name} wins!`;
    }else if(player2Score > player1Score){
        resultText = `${player2Name} wins!`;
    }

    return( 
        <div className='final-screen'>
            <h2>Final Result</h2>

            <div className='final-score'>
                <p>{player1Name}: <strong>{player1Score}</strong></p>
                <p>{player1Name}: <strong>{player1Score}</strong></p>
            </div>
            <h3 className='winner-text'>{resultText}</h3>

            <button className='restart-btn' onClick={() => navigate('/')}>
                Restart Game
            </button>
        </div>
    )
}

export default Final;