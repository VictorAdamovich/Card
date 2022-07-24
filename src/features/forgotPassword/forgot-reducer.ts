import { Dispatch } from 'redux';

import { setAppSnackbarAC, setAppStatusAC } from '../../app/app-reducer';

import { forgotAPI } from './forgot-api';

type InitialStateType = {
  email?: string;
  token?: string;
};

const initialState: InitialStateType = {};

export const forgotReducer = (
  state: InitialStateType = initialState,
  action: ForgotActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'forgot/SET-EMAIL-FOR-PASSWORD-RECOVERY':
      return { ...state, email: action.email };
    case 'forgot/SET-TOKEN-FOR-PASSWORD-RECOVERY':
      return { ...state, token: action.token };
    default:
      return state;
  }
};

// _____________________Actions___________

export const setEmailForPasswordRecovery = (email: string) =>
  ({
    type: 'forgot/SET-EMAIL-FOR-PASSWORD-RECOVERY',
    email,
  } as const);
export const setTokenForPasswordRecovery = (token: string) =>
  ({
    type: 'forgot/SET-TOKEN-FOR-PASSWORD-RECOVERY',
    token,
  } as const);

// ______________________Thunks______________________

export const forgotPassword = (email: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  forgotAPI
    .forgot(email)
    .then(res => {
      dispatch(setEmailForPasswordRecovery(email));
      dispatch(setAppSnackbarAC('success', res.data.info));
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch(res => {
      dispatch(setAppSnackbarAC('warning', res.data.message));
      dispatch(setAppStatusAC('failed'));
    });
};

export const createNewPassword =
  (password: string, token: string) => (dispatch: Dispatch) => {
    console.log('dispatch to app reducer for start loading');
    forgotAPI
      .createNewPassword(password, token)
      .then(res => {
        dispatch(setTokenForPasswordRecovery(token));
        console.log(res.data);
        console.log('dispatch to app reducer for idle');
      })
      .catch(res => console.log(res.request.response));
  };

// _________________________TYPES______________
export type SetEmailForPasswordRecoveryAT = ReturnType<
  typeof setEmailForPasswordRecovery
>;
export type SetTokenForPasswordRecoveryAT = ReturnType<
  typeof setTokenForPasswordRecovery
>;

export type ForgotActionsType =
  | SetEmailForPasswordRecoveryAT
  | SetTokenForPasswordRecoveryAT;
