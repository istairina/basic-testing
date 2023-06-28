// Uncomment the code below and write your tests
// import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { doStuffByInterval, doStuffByTimeout } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const ms = 500;
    const callback = jest.fn();
    doStuffByTimeout(callback, ms);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), ms);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const ms = 500;
    const callback = jest.fn();
    doStuffByTimeout(callback, ms);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const ms = 500;
    const callback = jest.fn();
    doStuffByInterval(callback, ms);
    jest.advanceTimersByTime(ms);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const ms = 500;
    const callAmount = 5;
    const callback = jest.fn();
    doStuffByInterval(callback, ms);
    jest.advanceTimersByTime(ms * callAmount);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(callAmount + 1);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
