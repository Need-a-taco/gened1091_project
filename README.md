# Philosophical Life Journey

A React application that guides users through life choices aligned with ancient Chinese philosophical traditions.

## Overview

This interactive survey application uses your custom graph structure from `graph.js` to present users with life decisions. Each choice aligns with one of four major Chinese philosophical schools:

- **Kongzi (Confucius)**: Values education, relationships, and self-cultivation
- **Laozi (Daoism)**: Emphasizes natural flow and spontaneity
- **Mozi (Mohism)**: Focuses on pragmatism and utility
- **Lord Shang (Legalism)**: Prioritizes order, discipline, and duty

## Features

- ✨ Beautiful, modern UI with smooth animations
- 📊 Real-time tracking of philosophical alignments
- 📈 Visual results showing which philosopher you align with most
- 📱 Fully responsive design for mobile and desktop
- 🔄 Ability to restart and try different paths
- 📜 Complete journey timeline showing all your choices

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
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main app component
│   ├── App.css            # App styles
│   ├── index.css          # Global styles
│   ├── graph.js           # Your life event graph structure
│   └── components/
│       ├── Survey.jsx     # Survey question component
│       ├── Survey.css     # Survey styles
│       ├── Results.jsx    # Results display component
│       └── Results.css    # Results styles
```

## Customizing the Survey

The survey now loads from **`public/graph.csv`** for easy editing!

### Quick Start

1. Open `public/graph.csv` in Excel, Google Sheets, or any text editor
2. Edit life events, options, and branching logic
3. Save the file
4. Refresh the application

### CSV Format

See [`CSV_FORMAT.md`](./CSV_FORMAT.md) for detailed documentation on the CSV structure.

**Key Features:**
- ✅ Each row is a life event
- ✅ Options are JSON arrays (4 per event for Kongzi, Laozi, Mozi, Lord Shang)
- ✅ Support for random event branching
- ✅ Points system built-in
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
- CSS3 with modern features
- Custom graph data structure

## License

This project is part of GenEd 1091 at Harvard University.


# gened1091_project
