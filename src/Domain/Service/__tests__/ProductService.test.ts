import {it, expect} from "vitest";
import { ProductService } from '../ProductService'

it('throw errors on wrong input', () => {
  ['123', 'oneTwoThree', [], true, undefined, null].forEach((currTest) => {
    // @ts-ignore ignore type test
    expect(()=>ProductService.getStepFromQuantity(currTest))
      .toThrow();
  });
});

it('return proper step', () => {
  [
    [0, 1],
    [0.01, 0.01],
    [0.1, 0.1],
    [1, 1],
    [10, 10],
    [100, 100],
    [1000, 1000],
    [0.05, 0.01],
    [0.5, 0.1],
    [5, 1],
    [50, 10],
    [500, 100],
    [5000, 1000],
    [0.15, 0.01],
    [1.5, 0.1],
    [15, 1],
    [150, 10],
    [1500, 100],
    [0.02, 0.01],
    [0.2, 0.1],
    [2, 1],
    [20, 10],
    [200, 100],
    [2000, 1000],
    [23.45, 0.01],
    [234.5, 0.1],
    [2345, 1],
    [2340, 10],
    [2300, 100],
    [2000, 1000],
  ].forEach(([input, result]) => {
    // console.log({input})
    expect(ProductService.getStepFromQuantity(input)).toBe(result);
  });
})
