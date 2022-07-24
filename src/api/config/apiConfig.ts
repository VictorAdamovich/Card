import axios, { AxiosInstance } from 'axios';

export const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
});
