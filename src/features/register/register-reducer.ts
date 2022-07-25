import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { setAppSnackbarAC, setAppStatusAC } from '../../app/app-reducer';

import { LoginErrorType, registerApi } from './register-api';

const initialState = {
  isRegister: false,
} as const;

export const registerReducer = (
  state: initialStateType = initialState,
  action: RegisterReducerActionsType,
): initialStateType => {
  switch (action.type) {
    case 'register-reducer/Register': {
      return { ...state, isRegister: action.isRegister };
    }
    default:
      return state;
  }
};

// Action Creators
export const registerAC = () =>
  ({
    type: 'register-reducer/Register',
    isRegister: true,
  } as const);

// Thunks
export const register = (email: string, password: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  registerApi
    .createUser(email, password)
    .then(res => {
      dispatch(registerAC());
      dispatch(setAppSnackbarAC('success', res.statusText));
    })
    .catch((err: AxiosError<LoginErrorType>) => {
      dispatch(
        setAppSnackbarAC(
          'error',
          err.response ? err.response?.data.error : 'Some error occurred',
        ),
      );
    })
    .finally(() => {
      dispatch(setAppStatusAC('idle'));
    });
};

// Types
type initialStateType = {
  isRegister: boolean;
};

export type RegisterReducerActionsType = ReturnType<typeof registerAC>;
