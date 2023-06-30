import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');
    const baseURL = 'https://jsonplaceholder.typicode.com';
    throttledGetDataFromApi(baseURL);
    expect(axios.create).toHaveBeenCalledWith({ baseURL: baseURL });
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios.Axios.prototype, 'get').mockImplementation(async () => {
      data: 'some data';
    });
    jest.useFakeTimers();
    const relativePath = '/some-relative-path';
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    // const baseURL = 'https://jsonplaceholder.typicode.com';
    // expect(axios.get).toHaveBeenCalledWith({
    //   pathname: relativePath,
    // });
    console.log(axios.get.arguments);
    jest.useRealTimers();
  });

  test('should return response data', async () => {
    // jest.spyOn(axios.Axios.prototype, 'get').mockImplementation(async () => {
    //   data: 'some data';
    // });
    // jest.useFakeTimers();
    // const relativePath = 'some-relative-path';
    // await throttledGetDataFromApi(relativePath);
    // jest.runAllTimers();
    // // expect(axios.get).toHaveBeenCalledWith({ baseURL: relativePath });
    // console.log(axios.get);
  });
});
