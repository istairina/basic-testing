import { InsufficientFundsError, TransferFailedError, getBankAccount } from '.';

describe('BankAccount', () => {
  
  test('should create account with initial balance', () => {
    const newBankAccount = getBankAccount(200);
    expect(newBankAccount.withdraw(0)).toEqual({"balance": 200});
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const newBankAccount = getBankAccount(200);
    expect(() => {newBankAccount.withdraw(300)}).toThrow(InsufficientFundsError);
  });

  //it's impossible
  test('should throw TransferFailedError error when transferring more than balance', () => {
    const newBankAccount = getBankAccount(200);
    expect(() => {newBankAccount.transfer(300, getBankAccount(0))}).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const newBankAccount = getBankAccount(200);
    expect(() => {newBankAccount.transfer(100, newBankAccount)}).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const newBankAccount = getBankAccount(200);
    newBankAccount.deposit(500);
    expect(newBankAccount.withdraw(0)).toEqual({"balance": 700});
  });

  test('should withdraw money', () => {
    const newBankAccount = getBankAccount(200);
    newBankAccount.withdraw(50);
    expect(newBankAccount.withdraw(0)).toEqual({"balance": 150});
  });

  test('should transfer money', () => {
    const newBankAccount = getBankAccount(200);
    const otherBankAccount = getBankAccount(200);
    newBankAccount.transfer(100, otherBankAccount);
    expect(newBankAccount.withdraw(0)).toEqual({"balance": 100});
    expect(otherBankAccount.withdraw(0)).toEqual({"balance": 300});
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const newBankAccount = getBankAccount(200);
    const balance = await newBankAccount.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
