import { Dispatch } from 'redux';

import { loginAPI } from './login-api';

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

export const logIn =
  (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    console.log('dispatch to app reducer for start loading');
    loginAPI
      .login({ email, password, rememberMe })
      .then(res => {
        dispatch(logInAC());
        console.log(res.data);
        console.log('dispatch to app reducer for idle');
      })
      .catch(res => console.log(res.request.response));
  };

export const logOut = () => (dispatch: Dispatch) => {
  console.log('dispatch to app reducer for start loading');
  loginAPI
    .logout()
    .then(res => {
      dispatch(logOutAC());
      console.log(res.data);
      console.log('dispatch to app reducer for idle');
    })
    .catch(console.log);
};

// Types

export type LoginReducerActionsType = LoginAT | LogoutAT;
type LoginAT = ReturnType<typeof logInAC>;
type LogoutAT = ReturnType<typeof logOutAC>;
