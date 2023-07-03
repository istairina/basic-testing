import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: '2', b: 2, action: Action.Exponentiate, expected: null },
  { a: 3, b: 0, action: Action, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculator({a: $a, b: $b, action: $action}',
    (data) => {
      const result = simpleCalculator({
        a: data.a,
        b: data.b,
        action: data.action,
      });
      expect(result).toBe(data.expected);
    },
  );
});
