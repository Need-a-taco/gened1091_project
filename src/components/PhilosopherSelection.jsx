import React, { useState } from 'react';
import './PhilosopherSelection.css';

const philosophers = [
  {
    name: 'Kongzi',
    fullName: 'Kongzi (Confucius)',
    description: 'Values education, personal cultivation, and relationships. Believes in the transformative power of learning and social harmony.',
    color: '#8B4513',
    icon: '孔'
  },
  {
    name: 'Laozi',
    fullName: 'Laozi (Daoism)',
    description: 'Follows the natural flow of life and embraces spontaneity. Resists rigid structures and follows the Dao - the natural way.',
    color: '#2E8B57',
    icon: '老'
  },
  {
    name: 'Mozi',
    fullName: 'Mozi (Mohism)',
    description: 'Pragmatic and utilitarian. Values efficiency, measurable outcomes, and making decisions based on practical consequences.',
    color: '#4169E1',
    icon: '墨'
  },
  {
    name: 'Lord Shang',
    fullName: 'Lord Shang (Legalism)',
    description: 'Values order, discipline, and practical work. Believes in clear rules and structures that serve the state or community.',
    color: '#8B0000',
    icon: '商'
  }
];

function PhilosopherSelection({ onSelect }) {
  const [selectedPhilosopher, setSelectedPhilosopher] = useState(null);

  const handleSelect = (philosopher) => {
    setSelectedPhilosopher(philosopher);
  };

  const handleConfirm = () => {
    if (selectedPhilosopher) {
      onSelect(selectedPhilosopher);
    }
  };

  return (
    <div className="philosopher-selection-container">
      <div className="selection-header">
        <h2>Choose Your Philosophical Path</h2>
        <p className="selection-subtitle">
          Select the ancient Chinese philosopher whose values resonate most with you.
          Your choices throughout the journey will be measured against this initial alignment.
        </p>
      </div>

      <div className="philosophers-grid">
        {philosophers.map((philosopher) => (
          <div
            key={philosopher.name}
            className={`philosopher-card ${selectedPhilosopher?.name === philosopher.name ? 'selected' : ''}`}
            onClick={() => handleSelect(philosopher)}
            style={{ 
              borderColor: selectedPhilosopher?.name === philosopher.name ? philosopher.color : '#e0e0e0'
            }}
          >
            <div className="philosopher-card-icon" style={{ backgroundColor: philosopher.color }}>
              {philosopher.icon}
            </div>
            <h3 className="philosopher-card-name">{philosopher.fullName}</h3>
            <p className="philosopher-card-description">{philosopher.description}</p>
            <div className="selection-indicator">
              <input
                type="radio"
                name="philosopher"
                checked={selectedPhilosopher?.name === philosopher.name}
                onChange={() => handleSelect(philosopher)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="selection-submit">
        <button
          className="begin-button"
          onClick={handleConfirm}
          disabled={!selectedPhilosopher}
        >
          Begin Your Journey
        </button>
      </div>
    </div>
  );
}

export default PhilosopherSelection;

