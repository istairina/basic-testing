import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  const input = 12;
  test('should resolve provided value', async () => {
    const result = await resolveValue(input);
    expect(result).toBe(input);
  });
});

describe('throwError', () => {
  const message = 'error here';
  test('should throw error with provided message', () => {
    expect(() => {throwError(message)}).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(await rejectCustomError()).toThrow('This is my awesome custom error!');
  });
});
