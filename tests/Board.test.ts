import Board from '../src/Board';
import Tile from '../src/Tile';

describe('Board class', () => {
  it('should have a 4x4 grid of tiles when initialized', () => {
    const board = new Board();
    expect(board.tiles.length).toBe(4);
    expect(board.tiles.every(row => row.length === 4)).toBe(true);
  });

  it('should have tiles with unique values between 0 and 15 when initialized', () => {
    const board = new Board();
    const values = board.tiles.flat().map(tile => tile.value);
    expect(new Set(values).size).toBe(16);
    expect(values.every(value => value >= 0 && value <= 15)).toBe(true);
  });

  it('should throw an error when initialized with invalid tile values', () => {
    const invalidBoard = () => {
      const shuffledNumbers = Array.from({ length: 15 }, (_, i) => i + 1);
      shuffledNumbers.push(16);
      const board: Tile[][] = [];
      for (let i = 0; i < 4; i++) {
        const row: Tile[] = [];
        for (let j = 0; j < 4; j++) {
          row.push(new Tile(shuffledNumbers[i * 4 + j]));
        }
        board.push(row);
      }
      return board;
    };
    expect(invalidBoard).toThrow(
      'Tile value must be a unique integer between 0 and 15'
    );
  });

  it('should update the position of the empty tile when a valid move is made', () => {
    const board = new Board();
    const emptyPosition = board.emptyPosition;
    board.moveTile(emptyPosition.row - 1, emptyPosition.col);
    expect(board.emptyPosition).toEqual({
      row: emptyPosition.row - 1,
      col: emptyPosition.col
    });
  });

  it('should detect the winning board when all tiles are in order', () => {
    const board = new Board();
    board.tiles = [
      [new Tile(1), new Tile(2), new Tile(3), new Tile(4)],
      [new Tile(5), new Tile(6), new Tile(7), new Tile(8)],
      [new Tile(9), new Tile(10), new Tile(11), new Tile(12)],
      [new Tile(13), new Tile(14), new Tile(15), new Tile(0)]
    ];
    expect(board.checkWin()).toBe(true);
  });

  it('should not move a tile outside the grid', () => {
    const board = new Board();
    const initialTiles = board.tiles;
    const initialEmptyPosition = board.emptyPosition;
    board.moveTile(0, -1);
    expect(board.tiles).toEqual(initialTiles);
    expect(board.emptyPosition).toEqual(initialEmptyPosition);
  });

  it('should print the current state of the grid', () => {
    const board = new Board();
    const consoleSpy = jest.spyOn(console, 'log');
    board.displayBoard();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
