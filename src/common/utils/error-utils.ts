import { Dispatch } from 'redux';

import { ActionsType, setAppSnackbarAC, setAppStatusAC } from 'app/app-reducer';

export const handleServerNetworkError = (
  error: string | undefined,
  dispatch: Dispatch<ReturnType<typeof setAppSnackbarAC> | ActionsType>,
): void => {
  dispatch(setAppSnackbarAC('error', error || 'Some error occurred'));
  dispatch(setAppStatusAC('failed'));
};
