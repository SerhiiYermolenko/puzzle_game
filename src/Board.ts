import Tile from './Tile';

/**
 * Represents the game board for the 15 Puzzle game.
 */
export default class Board {
  tiles: Tile[][];
  emptyPosition: { row: number; col: number };

  /**
   * Constructs a new instance of the Board class.
   * Initializes the tiles array and the position of the empty tile.
   */
  constructor() {
    [this.tiles, this.emptyPosition] = this.generateRandomBoard();
  }

  /**
   * Generates a random game board with shuffled tiles.
   * @returns A tuple containing the generated board and the position of the empty tile.
   */
  private generateRandomBoard(): [Tile[][], { row: number; col: number }] {
    const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
    numbers.push(0); // Represents empty tile
    const shuffledNumbers = this.shuffleArray(numbers);
    let emptyTilePosition = { row: 3, col: 3 }; // default position of empty tile

    const board: Tile[][] = [];
    for (let i = 0; i < 4; i++) {
      const row: Tile[] = [];
      for (let j = 0; j < 4; j++) {
        const tile = new Tile(shuffledNumbers[i * 4 + j]);
        row.push(tile);
        if (tile.value === 0) {
          emptyTilePosition = { row: i, col: j };
        }
      }
      board.push(row);
    }
    return [board, emptyTilePosition];
  }

  /**
   * Shuffles an array using the Fisher-Yates algorithm.
   * @param array - The array to be shuffled.
   * @returns The shuffled array.
   */
  private shuffleArray(array: number[]): number[] {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i]
      ];
    }
    return shuffledArray;
  }

  /**
   * Checks if a move to the given row and column is valid.
   * @param row - The row index of the tile.
   * @param col - The column index of the tile.
   * @returns True if the move is valid, false otherwise.
   */
  private isValidMove(row: number, col: number): boolean {
    return (
      (Math.abs(row - this.emptyPosition.row) === 1 &&
        col === this.emptyPosition.col) ||
      (Math.abs(col - this.emptyPosition.col) === 1 &&
        row === this.emptyPosition.row)
    );
  }

  /**
   * Displays the current state of the game board in the console.
   */
  displayBoard(): void {
    this.tiles.forEach(row => {
      console.log(
        row.map(tile => (tile.value === 0 ? ' ' : tile.value)).join(' ')
      );
    });
    console.log();
  }

  /**
   * Moves a tile to the empty position if the move is valid.
   * @param row - The row index of the tile to be moved.
   * @param col - The column index of the tile to be moved.
   */
  moveTile(row: number, col: number): void {
    if (this.isValidMove(row, col)) {
      [
        this.tiles[this.emptyPosition.row][this.emptyPosition.col],
        this.tiles[row][col]
      ] = [
        this.tiles[row][col],
        this.tiles[this.emptyPosition.row][this.emptyPosition.col]
      ];
      this.emptyPosition = { row, col };
    } else {
      console.log(
        "Invalid move! Please insert indexes of empty value's neighbours\n"
      );
    }
  }

  /**
   * Checks if the game is won by verifying if all tiles are in order.
   * @returns True if the game is won, false otherwise.
   */
  checkWin(): boolean {
    return this.tiles
      .flat()
      .every((tile, index) =>
        index === 15 ? tile.value === 0 : tile.value === index + 1
      );
  }
}
