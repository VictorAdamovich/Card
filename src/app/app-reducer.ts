import { Dispatch } from 'redux';

import { loginAPI } from '../features/login/login-api';
import { logInAC, setUserInfo } from '../features/login/login-reducer';

const initialState: InitialStateType = {
  isInit: false,
  status: 'idle',
  error: null,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };
    case 'APP/SET-ERROR':
      return { ...state, error: action.error };
    case 'APP/SET-INITIALIZATION':
      return { ...state, isInit: action.status };
    default:
      return { ...state };
  }
};
export const setAppStatusAC = (status: RequestStatusType) =>
  ({
    type: 'APP/SET-STATUS',
    status,
  } as const);

export const setAppErrorAC = (error: string | null) =>
  ({
    type: 'APP/SET-ERROR',
    error,
  } as const);
export const setAuthorization = (status: boolean) =>
  ({
    type: 'APP/SET-INITIALIZATION',
    status,
  } as const);

// _____________________ Thunks _________________

export const me = () => (dispatch: Dispatch) => {
  console.log('in me thunk');
  dispatch(setAppStatusAC('loading'));
  loginAPI
    .me()
    .then(res => {
      console.log('you authirized');
      dispatch(logInAC());
      dispatch(setUserInfo(res.data));
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch(res => {
      console.log(res.response.data.error);
      dispatch(setAppErrorAC(res.response.data.error));
      dispatch(setAppStatusAC('failed'));
    })
    .finally(() => {
      console.log('App init');
      dispatch(setAuthorization(true));
    });
};

export type AppActionsType =
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAuthorization>;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInit: boolean;
};
