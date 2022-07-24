import { Dispatch } from 'redux';

import { setAppSnackbarAC, setAppStatusAC } from '../../app/app-reducer';

import { loginAPI } from './login-api';

const initialState = {
  isLoggedIn: false,
} as const;

type initialStateType = {
  isLoggedIn: boolean;
  userInfo?: any;
};

export const loginReducer = (
  state: initialStateType = initialState,
  action: LoginReducerActionsType,
): initialStateType => {
  switch (action.type) {
    case 'login-reducer/LOGIN':
      return { ...state, isLoggedIn: action.newStatus };
    case 'login-reducer/LOGOUT':
      return { ...state, isLoggedIn: action.newStatus };
    case 'login/SET-USER-INFO':
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

//  Action Creators

export const logInAC = () =>
  ({
    type: 'login-reducer/LOGIN',
    newStatus: true,
  } as const);
export const logOutAC = () =>
  ({
    type: 'login-reducer/LOGOUT',
    newStatus: false,
  } as const);
export const setUserInfo = (payload: any) =>
  ({
    type: 'login/SET-USER-INFO',
    payload,
  } as const);

// Thunks

export const logIn =
  (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    loginAPI
      .login({ email, password, rememberMe })
      .then(res => {
        dispatch(logInAC());
        dispatch(setUserInfo(res.data));
        dispatch(setAppStatusAC('succeeded'));
      })
      .catch(err => {
        console.log(err);
        dispatch(setAppSnackbarAC('warning', err.response.data.error));
        dispatch(setAppStatusAC('failed'));
      });
  };

export const logOut = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  loginAPI
    .logout()
    .then(res => {
      dispatch(logOutAC());
      console.log(res.data);
      dispatch(setAppSnackbarAC('success', res.data.info));
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch(err => {
      console.log(err);
      dispatch(setAppSnackbarAC('warning', err.message));
      dispatch(setAppStatusAC('failed'));
    });
};

// Types

export type LoginReducerActionsType = LoginAT | LogoutAT | SetUserInfoAT;
type LoginAT = ReturnType<typeof logInAC>;
type LogoutAT = ReturnType<typeof logOutAC>;
type SetUserInfoAT = ReturnType<typeof setUserInfo>;
