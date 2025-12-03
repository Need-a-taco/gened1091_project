import { loadGameDataFromFile } from './graphLoader.js';

let gameManager = null;

export async function initializeGame() {
  if (!gameManager) {
    gameManager = await loadGameDataFromFile('/game_data.csv');
  }
  return gameManager;
}

export function getGameManager() {
  return gameManager;
}

export function resetGame() {
  if (gameManager) {
    gameManager.reset();
  }
}
