/**
 * Represents the structure of a tile in the game.
 */
interface ITile {
  value: number;
}

/**
 * Represents a tile in the 15 Puzzle game.
 */
export default class Tile implements ITile {
  private _value: number;
  public static values: number[] = [];

  /**
   * Constructs a new instance of the Tile class.
   * @param value - The value assigned to the tile.
   * @throws Error if the tile value is not a unique integer between 0 and 15.
   */
  constructor(value: number) {
    if (!this.isValidTileValue(value, true) && this.isUniqueTileValue(value)) {
      throw new Error('Tile value must be a unique integer between 0 and 15');
    }
    this._value = value;
    Tile.values.push(value);
  }

  /**
   * Gets the value of the tile.
   */
  get value(): number {
    return this._value;
  }

  /**
   * Sets the value of the tile.
   * @throws Error if the new value is not a unique integer between 1 and 15.
   */
  set value(value: number) {
    if (!this.isValidTileValue(value, false) && this.isUniqueTileValue(value)) {
      throw new Error('Tile value must be a unique integer between 1 and 15');
    }
    this._value = value;
  }

  /**
   * Checks if a tile value is valid.
   * @param value - The value to be validated.
   * @param isInConstructor - Whether the validation is done in the constructor.
   * @returns True if the value is a valid integer between 0 and 15, false otherwise.
   */
  isValidTileValue(value: number, isInConstructor: boolean): boolean {
    const floorValue = isInConstructor ? 0 : 1;
    return value >= floorValue && value <= 15 && Number.isInteger(value);
  }

  /**
   * Checks if a tile value is unique among other tile values.
   * @param value - The value to be checked for uniqueness.
   * @returns True if the value is unique, false otherwise.
   */

  isUniqueTileValue(value: number): boolean {
    return !Tile.values.includes(value);
  }
}
