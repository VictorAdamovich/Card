const initialState: InitialStateType = {
  status: 'idle',
  snackbarSeverity: null,
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
        snackbarSeverity: action.snackbarSeverity,
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

export const setAppSnackbarAC = (
  snackbarSeverity: SnackbarSeverityType | null,
  snackbarMessage: string | null,
) =>
  ({
    type: 'APP/SET-SNACKBAR',
    snackbarSeverity,
    snackbarMessage,
  } as const);

export type ActionsType =
  | ReturnType<typeof setAppSnackbarAC>
  | ReturnType<typeof setAppStatusAC>;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type SnackbarSeverityType = 'success' | 'error' | 'info' | 'warning';
export type InitialStateType = {
  status: RequestStatusType;
  snackbarSeverity: SnackbarSeverityType | null;
  snackbarMessage: string | null;
};
