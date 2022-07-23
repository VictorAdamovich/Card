import { Dispatch } from 'redux';

import { loginAPI, LoginRequestBodyType } from './login-api';

const initialState = {
  isLoggedIn: false,
} as const;

type initialStateType = {
  isLoggedIn: boolean;
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

// Thunks

export const LogIn =
  (requestBody: LoginRequestBodyType) => async (dispatch: Dispatch) => {
    try {
      const res = await loginAPI.login(requestBody);
      dispatch(logInAC());
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

// Types

export type LoginReducerActionsType = LoginAT | LogoutAT;
type LoginAT = ReturnType<typeof logInAC>;
type LogoutAT = ReturnType<typeof logOutAC>;
