import React, { useState, useMemo } from 'react';
import './Survey.css';

function Survey({ currentEvent, onChoice, isDead, deathReason }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = currentEvent.getAllOptions();
  
  // Randomize the order of options, but keep it stable for this render
  const optionTexts = useMemo(() => {
    const keys = Object.keys(options);
    // Fisher-Yates shuffle algorithm
    const shuffled = [...keys];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [currentEvent]); // Re-shuffle when the event changes

  const handleSelect = (optionText) => {
    setSelectedOption(optionText);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onChoice(selectedOption);
      setSelectedOption(null);
    }
  };

  // Check if player died
  if (isDead) {
    return (
      <div className="survey-container death-screen">
        <div className="death-notification">
          <div className="death-skull">💀</div>
          <h1 className="death-title">YOU DIED</h1>
          <div className="death-divider">⚰️</div>
          <p className="death-reason-text">{deathReason}</p>
          <div className="death-subtitle">
            <p>By straying from your chosen philosophical path,</p>
            <p>fate intervened in the most unexpected way.</p>
          </div>
          <div className="death-fade">Your journey has ended...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-container">
      <div className="age-indicator">
        <span className="age-badge">Age {currentEvent.getAge()}</span>
      </div>
      
      <div className="question-section">
        <h2 className="question-text">{currentEvent.getDescription()}</h2>
      </div>

      <div className="options-section">
        {optionTexts.map((optionText, index) => {
          const option = options[optionText];
          return (
            <div 
              key={index}
              className={`option-card ${selectedOption === optionText ? 'selected' : ''}`}
              onClick={() => handleSelect(optionText)}
            >
              <div className="option-content">
                <div className="option-radio">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="life-choice"
                    checked={selectedOption === optionText}
                    onChange={() => handleSelect(optionText)}
                  />
                </div>
                <label htmlFor={`option-${index}`} className="option-label">
                  <div className="option-text">{optionText}</div>
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <div className="submit-section">
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          Continue Your Journey
        </button>
      </div>
    </div>
  );
}

export default Survey;
