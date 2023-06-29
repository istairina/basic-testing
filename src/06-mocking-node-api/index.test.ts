import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

// import { Buffer } from 'buffer';

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
    const pathToFile = 'test.txt';
    jest.spyOn(path, 'join');
    readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledTimes(1);
    expect(path.join).toHaveBeenCalledWith(expect.anything(), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'test.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test.txt';
    const mockText = 'CHECKED!';
    jest.mock('fs');
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.mock('fs/promises');
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(mockText);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(mockText);
  });
});
