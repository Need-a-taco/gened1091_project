import React, { useState, useEffect } from 'react';
import { initializeGame, resetGame } from './graphFromCSV.js';
import PhilosopherSelection from './components/PhilosopherSelection';
import Survey from './components/Survey';
import Results from './components/Results';
import './App.css';

function App() {
  const [gameManager, setGameManager] = useState(null);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [initialPhilosopher, setInitialPhilosopher] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [philosopherChoices, setPhilosopherChoices] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isDead, setIsDead] = useState(false);
  const [deathReason, setDeathReason] = useState('');
  const [totalPoints, setTotalPoints] = useState({
    careerPoints: 0,
    parentsPoints: 0,
    childrenPoints: 0,
    healthPoints: 0,
    friendsPoints: 0
  });

  const deathReasons = [
    "You were struck by lightning during a freak storm.",
    "You contracted a mysterious illness while traveling abroad.",
    "You were involved in an unfortunate accident.",
    "You ate some questionable street food and didn't recover.",
    "You were caught in a natural disaster.",
    "You had an unexpected allergic reaction.",
    "You were in the wrong place at the wrong time.",
    "Your journey ended due to unforeseen circumstances.",
    "Fate had other plans for you.",
    "A series of unfortunate events led to your early demise."
  ];

  // Load game data on mount
  useEffect(() => {
    async function loadGame() {
      try {
        const manager = await initializeGame();
        setGameManager(manager);
        const firstQuestion = manager.getCurrentQuestion();
        setCurrentQuestion(firstQuestion);
        setGameLoaded(true);
      } catch (error) {
        console.error('Failed to load game:', error);
      }
    }
    loadGame();
  }, []);

  const handlePhilosopherSelection = (philosopher) => {
    setInitialPhilosopher(philosopher.name);
  };

  const handleChoice = (optionText) => {
    const option = currentQuestion.getOption(optionText);
    
    console.log('Choice made:', {
      optionPhilosopher: option.philosopher,
      initialPhilosopher: initialPhilosopher,
      matches: option.philosopher === initialPhilosopher,
      currentAge: currentQuestion.getAge()
    });
    
    // Check if choice matches initial philosopher
    const isCorrectChoice = option.philosopher === initialPhilosopher;
    
    // If wrong choice, 1/6 chance of death
    if (!isCorrectChoice) {
      const randomRoll = Math.random();
      const deathThreshold = 1/6;
      console.log(`Wrong choice! Rolling for death... ${randomRoll.toFixed(3)} vs ${deathThreshold.toFixed(3)}`);
      
      if (randomRoll < deathThreshold) {
        // Player dies!
        console.log('💀 DEATH! Player has died.');
        const randomDeathIndex = Math.floor(Math.random() * deathReasons.length);
        
        // Still record this final choice
        setPhilosopherChoices([...philosopherChoices, {
          philosopher: option.philosopher,
          question: currentQuestion.getDescription(),
          choice: optionText,
          age: currentQuestion.getAge()
        }]);
        
        // Update points
        setTotalPoints({
          careerPoints: totalPoints.careerPoints + (option.careerPoints || 0),
          parentsPoints: totalPoints.parentsPoints + (option.parentsPoints || 0),
          childrenPoints: totalPoints.childrenPoints + (option.childrenPoints || 0),
          healthPoints: totalPoints.healthPoints + (option.healthPoints || 0),
          friendsPoints: totalPoints.friendsPoints + (option.friendsPoints || 0)
        });
        
        // Show death screen first, then results after delay
        setDeathReason(deathReasons[randomDeathIndex]);
        setIsDead(true);
        
        // Wait 4 seconds before showing final results
        setTimeout(() => {
          setIsComplete(true);
        }, 4000);
        
        return; // End the game here
      } else {
        console.log('✅ Survived! Continuing...');
      }
    } else {
      console.log('✓ Correct choice - no death roll needed');
    }
    
    // Record the philosopher choice
    setPhilosopherChoices([...philosopherChoices, {
      philosopher: option.philosopher,
      question: currentQuestion.getDescription(),
      choice: optionText,
      age: currentQuestion.getAge()
    }]);

    // Update points
    setTotalPoints({
      careerPoints: totalPoints.careerPoints + (option.careerPoints || 0),
      parentsPoints: totalPoints.parentsPoints + (option.parentsPoints || 0),
      childrenPoints: totalPoints.childrenPoints + (option.childrenPoints || 0),
      healthPoints: totalPoints.healthPoints + (option.healthPoints || 0),
      friendsPoints: totalPoints.friendsPoints + (option.friendsPoints || 0)
    });

    // Mark this question as asked
    gameManager.markQuestionAsked(currentQuestion.getDescription());
    
    // Process the choice (updates has_education, has_family, and age)
    gameManager.processChoice(option.philosopher);
    
    console.log('Game state after choice:', gameManager.getState());
    
    // Check if game is over
    if (gameManager.isGameOver()) {
      setIsComplete(true);
      return;
    }
    
    // Get next question
    const nextQuestion = gameManager.getCurrentQuestion();
    
    if (nextQuestion === null) {
      // No more questions, game is complete
      setIsComplete(true);
      return;
    }
    
    console.log('Next question:', {
      age: nextQuestion.getAge(),
      description: nextQuestion.getDescription().substring(0, 50) + '...'
    });
    
    setCurrentQuestion(nextQuestion);
  };

  const handleRestart = () => {
    resetGame();
    const manager = gameManager;
    manager.reset();
    
    setInitialPhilosopher(null);
    setCurrentQuestion(manager.getCurrentQuestion());
    setPhilosopherChoices([]);
    setIsComplete(false);
    setIsDead(false);
    setDeathReason('');
    setTotalPoints({
      careerPoints: 0,
      parentsPoints: 0,
      childrenPoints: 0,
      healthPoints: 0,
      friendsPoints: 0
    });
  };

  if (!gameLoaded || !currentQuestion) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Philosophical Life Journey</h1>
          <p className="subtitle">Loading...</p>
        </header>
        <main className="App-main">
          <div style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>
            <p>Loading the philosophical journey...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Philosophical Life Journey</h1>
        <p className="subtitle">Navigate life's choices through the lens of ancient Chinese philosophy</p>
      </header>
      
      <main className="App-main">
        {!initialPhilosopher ? (
          <PhilosopherSelection onSelect={handlePhilosopherSelection} />
        ) : !isComplete ? (
          <Survey 
            currentEvent={currentQuestion}
            onChoice={handleChoice}
            isDead={isDead}
            deathReason={deathReason}
          />
        ) : (
          <Results 
            initialPhilosopher={initialPhilosopher}
            choices={philosopherChoices}
            totalPoints={totalPoints}
            isDead={isDead}
            deathReason={deathReason}
            onRestart={handleRestart}
          />
        )}
      </main>
      
      <footer className="App-footer">
        <p>Exploring wisdom from Kongzi (Confucius), Laozi, Mozi, and Lord Shang</p>
      </footer>
    </div>
  );
}

export default App;
