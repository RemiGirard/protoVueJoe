export class MathService {
  static hasDecimal = (value: number) => value%1 !== 0;

  static isMultipleOfTen = (value: number) => value !== 0 && (value/10)%1 === 0;

  static round = (value: number, precision: number = 0) => {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  }

  static round2 = (value: number) => this.round(value, 2);

  static roundAndFixedDecimal = (value: number, decimalCount: number) => {
    const roundedValue = this.round(value, decimalCount);
    const [integer, fractional] = roundedValue.toString().split('.');
    const fractionalWithZeros = (fractional + '0'.repeat(decimalCount)).slice(0, decimalCount);

    return Number(integer + '.' + fractionalWithZeros);
  }
}