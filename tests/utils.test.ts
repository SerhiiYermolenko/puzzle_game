import { isValidMenuOption } from '../src/utils';

describe('isValidInput function', () => {
  it('should return true when input is a valid number between 1 and 4', () => {
    expect(isValidMenuOption(2)).toBe(true);
  });

  it('should return true when input is the minimum valid value', () => {
    expect(isValidMenuOption(1)).toBe(true);
  });

  it('should return true when input is the maximum valid value', () => {
    expect(isValidMenuOption(4)).toBe(true);
  });

  it('should return false when input is less than the minimum valid value', () => {
    expect(isValidMenuOption(0)).toBe(false);
  });

  it('should return false when input is greater than the maximum valid value', () => {
    expect(isValidMenuOption(5)).toBe(false);
  });
});
