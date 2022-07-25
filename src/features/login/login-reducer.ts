import { Dispatch } from 'redux';

import { loginAPI } from './login-api';

const initialState = {
  isLoggedIn: false,
  userInfo: { name: '' },
} as const;

type initialStateType = {
  isLoggedIn: boolean;
  userInfo: UserInfoType;
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
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } };
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
export const setUserInfo = (payload: UserInfoType) =>
  ({
    type: 'login/SET-USER-INFO',
    payload,
  } as const);

type UserInfoType = {
  name: string;
  email?: string;
  avatar?: string;
};

// Thunks

export const logIn =
  (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    console.log('dispatch to app reducer for start loading');
    loginAPI
      .login({ email, password, rememberMe })
      .then(res => {
        dispatch(logInAC());
        dispatch(setUserInfo({ email: res.data.email, name: res.data.name }));
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

export const updateUserInfoTC = (data: UserInfoType) => (dispatch: Dispatch) => {
  loginAPI.updateUserInfo({ name: data.name, avatar: data.avatar }).then(() => {
    dispatch(setUserInfo({ ...data }));
  });
};

// Types

export type LoginReducerActionsType = LoginAT | LogoutAT | SetUserInfoAT;
type LoginAT = ReturnType<typeof logInAC>;
type LogoutAT = ReturnType<typeof logOutAC>;
type SetUserInfoAT = ReturnType<typeof setUserInfo>;
