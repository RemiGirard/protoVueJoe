import { it, expect, describe } from 'vitest'
import { MathService } from '../MathService'

describe('hasDecimal', () => {
  it('true cases', () => {
    [
      1.1,
      12.34,
      199.0000000001,
      7199254740991.1,
      9.007199254740991,
      123.456,
    ].forEach((input) => {
      expect(MathService.hasDecimal(input)).toBe(true);
    })
  });

  it('false cases', () => {
    [
      0,
      1,
      9007199254740991,
    ].forEach((input) => {
      expect(MathService.hasDecimal(input)).toBe(false);
    })
  });
});

describe('isMultipleOfTen', () => {
  it('true cases', () => {
    [
      10,
      20,
      100,
      12315613560,
      9090,
    ].forEach((input) => {
      expect(MathService.isMultipleOfTen(input)).toBe(true);
    })
  });

  it('false cases', () => {
    [
      0,
      1,
      2,
      456,
      9007199254740991,
      1.456,
      1.000001
    ].forEach((input) => {
      expect(MathService.isMultipleOfTen(input)).toBe(false);
    })
  });
});

describe('round2', () => {
  it('should round input to the nearest 2nd decimal number', () => {
    const testData = [
      { input: 0, expected: 0 },
      { input: 0.446, expected: 0.45 },
      { input: 1.224, expected: 1.22 },
      { input: 1.225, expected: 1.23 },
      { input: 9007199254740.123, expected: 9007199254740.12 },
    ];
    testData.forEach(({input, expected}) => {
      expect(MathService.round2(input)).toBe(expected);
    });
  });
});
