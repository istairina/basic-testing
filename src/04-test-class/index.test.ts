import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  let newBankAccount: BankAccount;
  const initialBalance = 200;

  beforeEach(() => {
    newBankAccount = getBankAccount(initialBalance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  jest.unmock('lodash');

  test('should create account with initial balance', () => {
    expect(newBankAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const moreThanBalance = initialBalance + 100;
    expect(() => {
      newBankAccount.withdraw(moreThanBalance);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const moreThanBalance = initialBalance + 100;
    const destBankAccount = getBankAccount(0);
    expect(() => {
      newBankAccount.transfer(moreThanBalance, destBankAccount);
    }).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      newBankAccount.transfer(100, newBankAccount);
    }).toThrowError();
  });

  test('should deposit money', () => {
    const depositAmount = 500;
    newBankAccount.deposit(depositAmount);
    expect(newBankAccount.getBalance()).toBe(depositAmount + initialBalance);
  });

  test('should withdraw money', () => {
    const amountMoney = 50;
    newBankAccount.withdraw(amountMoney);
    expect(newBankAccount.getBalance()).toEqual(initialBalance - amountMoney);
  });

  test('should transfer money', () => {
    const otherBankAccount = getBankAccount(initialBalance);
    newBankAccount.transfer(initialBalance, otherBankAccount);
    expect(newBankAccount.getBalance()).toEqual(
      initialBalance - initialBalance,
    );
    expect(otherBankAccount.getBalance()).toEqual(initialBalance * 2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(25).mockReturnValueOnce(1);
    const balance = await newBankAccount.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(25).mockReturnValueOnce(1);
    await newBankAccount.synchronizeBalance();
    expect(newBankAccount.getBalance()).not.toBe(initialBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await newBankAccount.synchronizeBalance();
    } catch (error) {
      expect(error instanceof SynchronizationFailedError).toBeTruthy();
    }
  });
});
