# Philosophical Life Journey

A React application that guides users through life choices aligned with ancient Chinese philosophical traditions.

## Overview

This interactive game presents users with life decisions from age 10 through 90. Each choice aligns with one of four major Chinese philosophical schools:

- **Kongzi (Confucius)**: Values education, relationships, and self-cultivation
- **Laozi (Daoism)**: Emphasizes natural flow and spontaneity
- **Mozi (Mohism)**: Focuses on pragmatism and utility
- **Lord Shang (Legalism)**: Prioritizes order, discipline, and duty

## Game Flow

1. **Choose a Philosopher**: Select which philosophical school you want to follow
2. **Age 10 - Education Decision**: Decide whether to pursue higher education
3. **Age 20 - Family Decision**: Decide whether to start a family
4. **Ages 30-90**: Face life dilemmas filtered by your education/family choices
5. **Results**: See how well you adhered to your chosen philosophy

### Life Points

Your choices affect five life categories:
- 💼 **Career** - Professional success and ambition
- 👪 **Parents** - Relationship with your parents
- 👶 **Children** - Relationship with your children
- ❤️ **Health** - Physical and mental wellbeing
- 🤝 **Friends** - Social connections and friendships

### Death Mechanic

If you stray from your chosen philosopher's path, you have a 1/6 chance of sudden death with each "wrong" choice. Stay true to your philosophy to survive!

## Features

- ✨ Beautiful, modern UI with smooth animations
- 📊 Real-time tracking of philosophical alignments
- 📈 Visual results showing which philosopher you align with most
- 📱 Fully responsive design for mobile and desktop
- 🔄 Ability to restart and try different paths
- 📜 Complete journey timeline showing all your choices
- 🎲 Randomized question order and answer shuffling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd final_project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Project Structure

```
final_project/
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── game_data.csv           # Game data source file
├── public/
│   └── game_data.csv       # Served game data
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main app component with game logic
│   ├── App.css             # App styles
│   ├── index.css           # Global styles
│   ├── graphLoader.js      # CSV parser and GameDataManager
│   ├── graphFromCSV.js     # Game initialization
│   └── components/
│       ├── PhilosopherSelection.jsx  # Initial philosopher choice
│       ├── PhilosopherSelection.css
│       ├── Survey.jsx      # Question display component
│       ├── Survey.css
│       ├── Results.jsx     # Results display component
│       └── Results.css
```

## Customizing the Game

The game loads from **`public/game_data.csv`** for easy editing!

### Quick Start

1. Open `game_data.csv` in Excel, Google Sheets, or any text editor
2. Edit questions, options, and point values
3. Save and copy to `public/game_data.csv`
4. Refresh the application

### CSV Format

See [`CSV_FORMAT.md`](./CSV_FORMAT.md) for detailed documentation on the CSV structure.

**Key Features:**
- ✅ Each row is a question with 4 philosopher options
- ✅ Questions filtered by `has_education` and `has_family` values
- ✅ First two questions (null values) set player state
- ✅ 5 point categories per option (career, parents, children, health, friends)
- ✅ Age-based progression from 10 to 90
- ✅ No coding required!

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## Technologies Used

- React 18
- Vite
- PapaParse (CSV parsing)
- CSS3 with modern features

## License

This project is part of GenEd 1091 at Harvard University.
