import * as readline from 'readline';

import Board from './Board';
import playGame from './game';

/**
 * Entry point of the 15 Puzzle game application.
 * Creates a readline interface and initializes the game board.
 * Runs the game loop using the playGame function.
 */
(async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const game = new Board();

  rl.on('close', () => {
    console.log('\nGame over!');
  });

  await playGame(game, rl);
})();
