import * as readline from 'readline';

import Board from './Board';
import { isValidMenuOption } from './utils';

/**
 * Plays the 15 Puzzle game.
 * @param game - The game board instance.
 * @param rl - The readline interface for handling user input.
 */
export default async function playGame(game: Board, rl: readline.Interface) {
  while (!game.checkWin()) {
    game.displayBoard();

    try {
      const row = await askQuestion(
        rl,
        'Enter the row of the tile you want to move: '
      );
      const col = await askQuestion(
        rl,
        'Enter the column of the tile you want to move: '
      );

      const rowNumber = Number(row);
      const colNumber = Number(col);

      if (!isValidMenuOption(rowNumber) || !isValidMenuOption(colNumber)) {
        throw new Error(
          'Invalid input. Please enter valid row and column numbers (1 to 4).'
        );
      }

      game.moveTile(rowNumber - 1, colNumber - 1);
    } catch (error) {
      const err = <Error>error;
      console.log(err.message);
    }
  }

  console.log("\nCongratulations! You've won the game!");
  rl.close();
}

/**
 * Asynchronously asks a question and returns the user's answer.
 * @param rl - The readline interface for handling user input.
 * @param question - The question to be asked.
 * @returns A promise that resolves with the user's answer.
 */
async function askQuestion(
  rl: readline.Interface,
  question: string
): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}
