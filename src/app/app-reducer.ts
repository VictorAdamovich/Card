const initialState: InitialStateType = {
  status: 'idle' as RequestStatusType,
  alertColor: 'success' as AlertColorType,
  snackbarMessage: '',
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

export type ActionsType =
  | ReturnType<typeof setAppSnackbarAC>
  | ReturnType<typeof setAppStatusAC>;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AlertColorType = 'success' | 'error' | 'info' | 'warning';
export type InitialStateType = {
  status: RequestStatusType;
  alertColor: AlertColorType;
  snackbarMessage: string;
};
