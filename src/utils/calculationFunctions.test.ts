import { add, minus, multiply, divide } from './calculationFunctions';

it('Add function test', () => {
  expect(add(1, 2)).toEqual(3);
  expect(add(2, 2)).toEqual(4);
  expect(add(0, 1)).toEqual(1);
  expect(add(0, -11)).toEqual(-11);
});

it('Minus function test', () => {
  expect(minus(1, 2)).toEqual(-1);
  expect(minus(2, 2)).toEqual(0);
  expect(minus(3, 2)).toEqual(1);
  expect(minus(0, -11)).toEqual(11);
});

it('Divide function test', () => {
  expect(divide(1, 2)).toEqual(0.5);
  expect(divide(4, 2)).toEqual(2);
  expect(divide(2, 2)).toEqual(1);
  expect(divide(5, -5)).toEqual(-1);
});

it('Multiply function test', () => {
  expect(multiply(1, 2)).toEqual(2);
  expect(multiply(2, 2)).toEqual(4);
  expect(multiply(0, 1)).toEqual(0);
  expect(multiply(2, 5)).toEqual(10);
});
