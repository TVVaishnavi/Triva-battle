import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/category.css';

function Category({ round, usedCategory, setSelectedCategory }) {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const category = [
        { label: 'Science', key: 'science' },
        { label: 'History', key: 'history' },
        { label: 'Geography', key: 'geography' },
        { label: 'Music', key: 'music' },
        { label: 'Sport and Leisure', key: 'sport and leisure' },
        { label: 'Film and TV', key: 'film and tv' },
        { label: 'Arts and literature', key: 'arts and literature' },
        { label: 'Socity and Culture', key: 'socity and culture' },
        { label: 'Food and Drinks', key: 'food and drink' },
        { label: 'General Knowledge', key: 'general knowledge' }
    ]

    const handleSelect = () => {
        if (!selected) return;

        if (usedCategory.includes(selected)) {
            alert("This category has already been played.");
            return;
        }

        setSelectedCategory(selected);
        navigate("/play");
    };

    return (
        <div className='category-screen'>
            <h2>Round {round}</h2>
            <p>Pick one Category to begin the round!</p>

            <div className='category-grid'>
                {category.map((cat) => {
                    const isUsed = usedCategory.includes(cat.key);

                    return (
                        <div
                            key={cat.key} className={`category-card ${isUsed ? "used" : ""} ${selected === cat.key ? "selected" : ""}`}
                            onClick={() => { if (!isUsed) setSelected(cat.key) }}
                        >
                            {cat.label}
                            {isUsed && <span className='used-tag'>Used</span>}
                        </div>
                    )
                })}
            </div>

            <button className='start-round-btn' onClick={handleSelect} disabled={!selected}>
                Start Round
            </button>
        </div>
    )
};

export default Category;