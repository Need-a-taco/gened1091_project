import Papa from 'papaparse';

// Question object factory
function Question(row, age, description) {
  return {
    age: age,
    description: description,
    hasEducation: row.has_education,
    hasFamily: row.has_family,
    options: {
      kongzi: {
        text: row.kongzi_option,
        philosopher: 'Kongzi',
        careerPoints: parseInt(row.kongzi_career_points) || 0,
        parentsPoints: parseInt(row.kongzi_parents_points) || 0,
        childrenPoints: parseInt(row.kongzi_children_points) || 0,
        healthPoints: parseInt(row.kongzi_health_points) || 0,
        friendsPoints: parseInt(row.kongzi_friends_points) || 0,
      },
      laozi: {
        text: row.laozi_option,
        philosopher: 'Laozi',
        careerPoints: parseInt(row.laozi_career_points) || 0,
        parentsPoints: parseInt(row.laozi_parents_points) || 0,
        childrenPoints: parseInt(row.laozi_children_points) || 0,
        healthPoints: parseInt(row.laozi_health_points) || 0,
        friendsPoints: parseInt(row.laozi_friends_points) || 0,
      },
      mozi: {
        text: row.mozi_option,
        philosopher: 'Mozi',
        careerPoints: parseInt(row.mozi_career_points) || 0,
        parentsPoints: parseInt(row.mozi_parents_points) || 0,
        childrenPoints: parseInt(row.mozi_children_points) || 0,
        healthPoints: parseInt(row.mozi_health_points) || 0,
        friendsPoints: parseInt(row.mozi_friends_points) || 0,
      },
      shang: {
        text: row.shang_option,
        philosopher: 'Lord Shang',
        careerPoints: parseInt(row.shang_career_points) || 0,
        parentsPoints: parseInt(row.shang_parents_points) || 0,
        childrenPoints: parseInt(row.shang_children_points) || 0,
        healthPoints: parseInt(row.shang_health_points) || 0,
        friendsPoints: parseInt(row.shang_friends_points) || 0,
      }
    },
    // Helper to get all options as an object keyed by option text
    getAllOptions() {
      const opts = {};
      Object.values(this.options).forEach(opt => {
        opts[opt.text] = opt;
      });
      return opts;
    },
    getOption(text) {
      return Object.values(this.options).find(opt => opt.text === text);
    },
    getDescription() {
      return this.description;
    },
    getAge() {
      return this.age;
    },
    getId() {
      return `q-${this.age}-${this.hasEducation}-${this.hasFamily}`;
    }
  };
}

// Game Data Manager - handles question selection and state
export class GameDataManager {
  constructor(questions) {
    this.allQuestions = questions;
    this.currentAge = 10;
    this.hasEducation = null; // null initially, then 'yes' or 'no'
    this.hasFamily = null;    // null initially, then 'yes' or 'no'
    this.askedDescriptions = new Set(); // Track which question descriptions we've asked
  }

  reset() {
    this.currentAge = 10;
    this.hasEducation = null;
    this.hasFamily = null;
    this.askedDescriptions = new Set();
  }

  getState() {
    return {
      currentAge: this.currentAge,
      hasEducation: this.hasEducation,
      hasFamily: this.hasFamily
    };
  }

  setState(state) {
    this.currentAge = state.currentAge;
    this.hasEducation = state.hasEducation;
    this.hasFamily = state.hasFamily;
  }

  // Get the current question based on game state
  getCurrentQuestion() {
    // First question: education (age 10, null has_education)
    if (this.hasEducation === null) {
      return this.allQuestions.find(q => 
        q.hasEducation === 'null' && q.age === 10
      );
    }
    
    // Second question: family (age 20, null has_family - the second setup question)
    if (this.hasFamily === null) {
      return this.allQuestions.find(q => 
        q.hasFamily === 'null' && q.age === 20
      );
    }
    
    // Regular questions: filter by player state and current age
    // Find questions at current age that match player's education/family state
    const eligibleQuestions = this.allQuestions.filter(q => {
      // Skip setup questions
      if (q.hasEducation === 'null' || q.hasFamily === 'null') return false;
      
      // Match age
      if (q.age !== this.currentAge) return false;
      
      // Match education status (case-insensitive)
      const qEdu = q.hasEducation?.toLowerCase();
      const playerEdu = this.hasEducation?.toLowerCase();
      if (qEdu !== playerEdu) return false;
      
      // Match family status (case-insensitive)
      const qFam = q.hasFamily?.toLowerCase();
      const playerFam = this.hasFamily?.toLowerCase();
      if (qFam !== playerFam) return false;
      
      // Don't repeat the same question description
      if (this.askedDescriptions.has(q.description)) return false;
      
      return true;
    });
    
    if (eligibleQuestions.length === 0) {
      // No more questions at this age, return null to signal game end
      return null;
    }
    
    // Pick a random eligible question
    const randomIndex = Math.floor(Math.random() * eligibleQuestions.length);
    return eligibleQuestions[randomIndex];
  }

  // Process a choice and update game state
  processChoice(philosopher) {
    // If this is the education question (first question)
    if (this.hasEducation === null) {
      // Determine has_education based on philosopher choice
      // Looking at the CSV: Kongzi, Laozi, Mozi go to college, Shang doesn't
      if (philosopher === 'Kongzi' || philosopher === 'Laozi' || philosopher === 'Mozi') {
        this.hasEducation = 'yes';
      } else {
        this.hasEducation = 'no';
      }
      // Don't increment age yet - family question is also at age 10->20 transition
      this.currentAge = 20;
      return;
    }
    
    // If this is the family question (second question)
    if (this.hasFamily === null) {
      // Determine has_family based on philosopher choice
      // Looking at the CSV: Kongzi, Mozi have family, Laozi, Shang don't
      if (philosopher === 'Kongzi' || philosopher === 'Mozi') {
        this.hasFamily = 'yes';
      } else {
        this.hasFamily = 'no';
      }
      // Now increment to age 30 for regular questions
      this.currentAge = 30;
      return;
    }
    
    // Regular question - increment age by 10
    this.currentAge += 10;
  }

  // Mark a question as asked (by its description)
  markQuestionAsked(description) {
    this.askedDescriptions.add(description);
  }

  // Check if game is over (age > 90 or no more questions)
  isGameOver() {
    if (this.currentAge > 90) return true;
    if (this.hasEducation !== null && this.hasFamily !== null) {
      return this.getCurrentQuestion() === null;
    }
    return false;
  }
}

// Parse CSV and create questions array
export function loadGameDataFromCSV(csvText) {
  const { data } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  });

  const questions = data.map(row => {
    return Question(
      row,
      parseInt(row.age),
      row.description
    );
  });

  return new GameDataManager(questions);
}

// Load from file
export async function loadGameDataFromFile(filePath) {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();
    return loadGameDataFromCSV(csvText);
  } catch (error) {
    console.error('Error loading CSV file:', error);
    throw error;
  }
}
