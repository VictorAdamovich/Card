import { Dispatch } from 'redux';

import { loginAPI } from '../features/login/login-api';
import { logInAC, setUserInfo } from '../features/login/login-reducer';

const initialState: InitialStateType = {
  status: 'idle' as RequestStatusType,
  alertColor: 'success' as AlertColorType,
  snackbarMessage: '',
  isInit: false,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };
    case 'APP/SET-SNACKBAR':
      return {
        ...state,
        alertColor: action.alertColor,
        snackbarMessage: action.snackbarMessage,
      };
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

export const setAppSnackbarAC = (alertColor: AlertColorType, message: string) =>
  ({
    type: 'APP/SET-SNACKBAR',
    alertColor,
    snackbarMessage: message,
  } as const);
export const setAuthorization = (status: boolean) =>
  ({
    type: 'APP/SET-INITIALIZATION',
    status,
  } as const);
// _____________________ Thunks _________________

export const me = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  loginAPI
    .me()
    .then(res => {
      dispatch(logInAC());
      dispatch(setUserInfo(res.data));
      dispatch(setAppSnackbarAC('success', 'You are authorized'));
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch(res => {
      console.log(res.response.data.error);
      dispatch(setAppSnackbarAC('warning', res.response.data.error));
      dispatch(setAppStatusAC('failed'));
    })
    .finally(() => {
      dispatch(setAuthorization(true));
    });
};

export type ActionsType =
  | ReturnType<typeof setAppSnackbarAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAuthorization>;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AlertColorType = 'success' | 'error' | 'info' | 'warning';
export type InitialStateType = {
  status: RequestStatusType;
  alertColor: AlertColorType;
  snackbarMessage: string;
  isInit: boolean;
};
