import React from 'react';
import './Results.css';

function Results({ initialPhilosopher, choices, totalPoints, isDead, deathReason, onRestart }) {
  // Count philosopher alignments
  const philosopherCounts = choices.reduce((acc, choice) => {
    acc[choice.philosopher] = (acc[choice.philosopher] || 0) + 1;
    return acc;
  }, {});

  // Calculate adherence to initial philosopher
  const adherenceCount = philosopherCounts[initialPhilosopher] || 0;
  const adherencePercentage = choices.length > 0 
    ? Math.round((adherenceCount / choices.length) * 100) 
    : 0;

  // Find the most aligned philosopher
  const sortedPhilosophers = Object.entries(philosopherCounts)
    .sort((a, b) => b[1] - a[1]);

  const primaryPhilosopher = sortedPhilosophers[0]?.[0] || 'Unknown';
  const primaryCount = sortedPhilosophers[0]?.[1] || 0;

  // Philosopher descriptions
  const philosopherInfo = {
    'Kongzi': {
      name: 'Kongzi (Confucius)',
      description: 'You value education, personal cultivation, and relationships. You believe in the transformative power of learning and see life as a journey of self-improvement through social harmony and ritual propriety.',
      color: '#8B4513'
    },
    'Laozi': {
      name: 'Laozi (Daoism)',
      description: 'You follow the natural flow of life and embrace spontaneity. You resist rigid structures and believe in following the Dao - the natural way. Your choices reflect a preference for flexibility and authenticity over convention.',
      color: '#2E8B57'
    },
    'Mozi': {
      name: 'Mozi (Mohism)',
      description: 'You are pragmatic and utilitarian in your approach to life. You value efficiency, measurable outcomes, and making decisions based on their practical consequences. Your choices reflect a focus on utility and results.',
      color: '#4169E1'
    },
    'Lord Shang': {
      name: 'Lord Shang (Legalism)',
      description: 'You value order, discipline, and practical work. You believe in clear rules and structures, and prefer straightforward paths that serve the state or community. Your choices reflect a preference for duty and discipline.',
      color: '#8B0000'
    }
  };

  const primaryInfo = philosopherInfo[primaryPhilosopher] || {
    name: 'Unknown',
    description: 'Your philosophical journey is unique.',
    color: '#666'
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>{isDead ? '💀 Your Journey Ended Early' : 'Your Philosophical Profile'}</h2>
        <p className="results-subtitle">
          {isDead ? 'Your life came to an unexpected end' : 'Based on your life choices'}
        </p>
      </div>

      {isDead && (
        <div className="death-notice">
          <div className="death-icon">⚰️</div>
          <h3>Cause of Death</h3>
          <p className="death-reason">{deathReason}</p>
          <p className="death-message">
            By straying from your chosen philosophical path, fate intervened in unexpected ways.
          </p>
        </div>
      )}

      <div className="adherence-section">
        <h3>Adherence to Your Initial Choice</h3>
        <div className="adherence-stats">
          <div className="initial-choice">
            <span className="label">You chose:</span>
            <span className="value" style={{ color: philosopherInfo[initialPhilosopher]?.color }}>
              {philosopherInfo[initialPhilosopher]?.name || initialPhilosopher}
            </span>
          </div>
          <div className="adherence-percentage">
            <div className="percentage-circle" style={{ 
              background: `conic-gradient(${philosopherInfo[initialPhilosopher]?.color} ${adherencePercentage * 3.6}deg, #e0e0e0 0deg)` 
            }}>
              <div className="percentage-inner">
                <span className="percentage-number">{adherencePercentage}%</span>
                <span className="percentage-label">Adherence</span>
              </div>
            </div>
          </div>
          <div className="adherence-message">
            {adherencePercentage >= 75 && (
              <p>🎯 Excellent! You stayed true to your chosen path.</p>
            )}
            {adherencePercentage >= 50 && adherencePercentage < 75 && (
              <p>👍 Good consistency with your initial philosophical choice.</p>
            )}
            {adherencePercentage >= 25 && adherencePercentage < 50 && (
              <p>🤔 Your journey led you to explore other perspectives.</p>
            )}
            {adherencePercentage < 25 && (
              <p>🌟 You discovered new philosophical alignments along the way.</p>
            )}
          </div>
        </div>
      </div>

      <div className="points-summary">
        <h3>Life Points Summary</h3>
        <div className="points-grid">
          <div className="point-card career">
            <div className="point-icon">💼</div>
            <div className="point-value">{totalPoints.careerPoints}</div>
            <div className="point-label">Career</div>
          </div>
          <div className="point-card parents">
            <div className="point-icon">👪</div>
            <div className="point-value">{totalPoints.parentsPoints}</div>
            <div className="point-label">Parents</div>
          </div>
          <div className="point-card children">
            <div className="point-icon">👶</div>
            <div className="point-value">{totalPoints.childrenPoints}</div>
            <div className="point-label">Children</div>
          </div>
          <div className="point-card health">
            <div className="point-icon">❤️</div>
            <div className="point-value">{totalPoints.healthPoints || 0}</div>
            <div className="point-label">Health</div>
          </div>
          <div className="point-card friends">
            <div className="point-icon">🤝</div>
            <div className="point-value">{totalPoints.friendsPoints || 0}</div>
            <div className="point-label">Friends</div>
          </div>
          <div className="point-card total">
            <div className="point-icon">⭐</div>
            <div className="point-value">
              {(totalPoints.careerPoints || 0) + (totalPoints.parentsPoints || 0) + (totalPoints.childrenPoints || 0) + (totalPoints.healthPoints || 0) + (totalPoints.friendsPoints || 0)}
            </div>
            <div className="point-label">Total</div>
          </div>
        </div>
      </div>

      <div className="primary-philosopher" style={{ borderColor: primaryInfo.color }}>
        <div className="philosopher-icon" style={{ backgroundColor: primaryInfo.color }}>
          {primaryPhilosopher.charAt(0)}
        </div>
        <h3 className="philosopher-name">{primaryInfo.name}</h3>
        <p className="philosopher-description">{primaryInfo.description}</p>
        <div className="alignment-strength">
          <span className="strength-label">Alignment Strength:</span>
          <span className="strength-value">{primaryCount} / {choices.length} choices</span>
        </div>
      </div>

      <div className="all-alignments">
        <h4>Your Complete Profile</h4>
        <div className="philosopher-bars">
          {sortedPhilosophers.map(([philosopher, count]) => {
            const info = philosopherInfo[philosopher];
            const percentage = (count / choices.length) * 100;
            return (
              <div key={philosopher} className="philosopher-bar-container">
                <div className="philosopher-bar-header">
                  <span className="philosopher-bar-name">{info.name}</span>
                  <span className="philosopher-bar-count">{count}</span>
                </div>
                <div className="philosopher-bar-track">
                  <div 
                    className="philosopher-bar-fill"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: info.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="choice-history">
        <h4>Your Journey</h4>
        <div className="choices-timeline">
          {choices.map((choice, index) => (
            <div key={index} className="choice-item">
              <div className="choice-age">Age {choice.age}</div>
              <div className="choice-details">
                <div className="choice-question">{choice.question}</div>
                <div className="choice-answer">{choice.choice}</div>
                <div className="choice-philosopher" style={{ 
                  color: philosopherInfo[choice.philosopher]?.color 
                }}>
                  — {choice.philosopher}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="restart-section">
        <button className="restart-button" onClick={onRestart}>
          Start a New Journey
        </button>
      </div>
    </div>
  );
}

export default Results;

