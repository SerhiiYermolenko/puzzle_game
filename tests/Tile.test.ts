import Tile from '../src/Tile';

describe('Tile class', () => {
  it('should create a Tile instance with a valid number value', () => {
    const tile = new Tile(5);
    expect(tile.value).toBe(5);
  });

  it('should throw an error when creating a Tile instance with a negative number value', () => {
    expect(() => new Tile(-5)).toThrow();
  });

  it('should throw an error when creating a Tile instance with a non-integer number value', () => {
    expect(() => new Tile(5.5)).toThrow();
  });

  it('should throw an error when creating a Tile with value higher then the top limit', () => {
    expect(() => new Tile(16)).toThrow();
  });

  it('should create a Tile instance with a value of 0', () => {
    const tile = new Tile(0);
    expect(tile.value).toBe(0);
  });

  it('should create multiple Tile instances with different values inside of the values range', () => {
    const tile1 = new Tile(5);
    const tile2 = new Tile(10);
    const tile3 = new Tile(15);
    expect(tile1.value).toBe(5);
    expect(tile2.value).toBe(10);
    expect(tile3.value).toBe(15);
  });

  it('should throw an error when creating multiple Tile instances with the same value', () => {
    const tile1 = new Tile(5);
    const tile2 = new Tile(5);
    const tile3 = new Tile(5);
    expect(tile1.value).toBe(tile2.value);
    expect(tile2.value).toBe(tile3.value);
  });
});
