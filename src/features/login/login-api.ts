import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
});

export const loginAPI = {
  login(requestBody: LoginRequestBodyType) {
    return instance.post<LoginRequestBodyType, AxiosResponse<LoginResponseType>>(
      'auth/login',
      requestBody,
    );
  },
};

export type LoginRequestBodyType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
type DeviceTokensItemType = {
  _id: string;
  device: string;
  token: string;
  tokenDeathTime: number;
};

type LoginResponseType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  __v: number;
  token: string;
  tokenDeathTime: number;
  avatar?: string;
  deviceTokens: DeviceTokensItemType[];
};
