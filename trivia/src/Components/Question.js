import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Question.css";

const scoreMap = {
    easy: 10,
    medium: 15,
    hard: 20
};

export default function Question({ player1Name, player2Name, selectedCategory, player1Score, setPlayer1Score, player2Score, setPlayer2Score, usedCategory, setUsedCategory }) {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedCategory) {
            fetchQuestions();
        }
    }, [selectedCategory, fetchQuestions]);

    const fetchQuestions = () => {
        Promise.all([
            fetch(
                `https://the-trivia-api.com/v2/questions?categories=${selectedCategory}&limit=2&difficulties=easy&type=multiple_choice`
            ).then(res => res.json()),

            fetch(
                `https://the-trivia-api.com/v2/questions?categories=${selectedCategory}&limit=2&difficulties=medium&type=multiple_choice`
            ).then(res => res.json()),

            fetch(
                `https://the-trivia-api.com/v2/questions?categories=${selectedCategory}&limit=2&difficulties=hard&type=multiple_choice`
            ).then(res => res.json())
        ])
            .then(([easy, medium, hard]) => {
                const orderedQuestions = [
                    easy[0], easy[1],
                    medium[0], medium[1],
                    hard[0], hard[1]
                ];

                setQuestions(orderedQuestions);
                setCurrentIndex(0); 

                console.log(
                    "Ordered difficulties:",
                    orderedQuestions.map(q => q.difficulty)
                );
            })
            .catch(error => {
                console.error("Error fetching questions:", error);
            });
    };



    if (questions.length === 0) {
        return <h2 className="loading">Loading Questions...</h2>;
    }


    const question = questions[currentIndex];
    const currentPlayer =
        currentIndex % 2 === 0 ? player1Name : player2Name;

    const options = [
        question.correctAnswer,
        ...question.incorrectAnswers
    ].sort(() => Math.random() - 0.5);

    const handleOptionSelect = (option) => {
        if (selectedOption) return;

        setSelectedOption(option);
        const correct = option === question.correctAnswer;
        setIsCorrect(correct);

        if (correct) {
            const points = scoreMap[question.difficulty];
            currentIndex % 2 === 0
                ? setPlayer1Score((prev) => prev + points)
                : setPlayer2Score((prev) => prev + points);
        }
    };

    const handleNext = () => {
        setSelectedOption(null);
        setIsCorrect(null);

        if (currentIndex === questions.length - 1) {
            setUsedCategory(prev => {
                if(prev.includes(selectedCategory)) return prev;
                return [...prev, selectedCategory];
            })
            navigate("/summary");
        } else {
            setCurrentIndex(prev => prev + 1);
        }
    };

    return (
        <div className="play-screen">
            <h2>Turn: {currentPlayer}</h2>

            <div className="score-board">
                <p>{player1Name}: {player1Score}</p>
                <p>{player2Name}: {player2Score}</p>
            </div>

            <p><strong>Category:</strong> {question.category}</p>
            <p><strong>Difficulty:</strong> {question.difficulty}</p>

            <h3 className="question-text">{question.question.text}</h3>

            <div className="options">
                {options.map((option, index) => {
                    let borderColor = "#ccc";

                    if (selectedOption === option) {
                        borderColor =
                            option === question.correctAnswer ? "green" : "red";
                    }

                    return (
                        <div
                            key={index}
                            className="option-card"
                            onClick={() => handleOptionSelect(option)}
                            style={{
                                border: `2px solid ${borderColor}`,
                                cursor: selectedOption ? "not-allowed" : "pointer",
                                opacity:
                                    selectedOption && selectedOption !== option ? 0.6 : 1
                            }}
                        >
                            <input
                                type="radio"
                                checked={selectedOption === option}
                                readOnly
                            />
                            <span>{option}</span>
                        </div>
                    );
                })}
            </div>

            {selectedOption && (
                <p className="result-text">
                    {isCorrect ? "Correct!" : "Wrong!"}
                </p>
            )}

            <button
                className="next-btn"
                onClick={handleNext}
                disabled={!selectedOption}
            >
                Next
            </button>
        </div>
    );
}
