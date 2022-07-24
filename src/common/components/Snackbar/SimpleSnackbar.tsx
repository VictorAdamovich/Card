import React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch } from 'react-redux';

import { setAppSnackbarAC } from '../../../app/app-reducer';
import { useAppSelector } from '../../../app/store';
import { ReturnComponentType } from '../../../types/ReturnComponentType';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  // PLS FIX LATER
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const SimpleSnackbar = (): ReturnComponentType => {
  const snackbarSeverity = useAppSelector(state => state.app.snackbarSeverity);
  const snackbarMessage = useAppSelector(state => state.app.snackbarMessage);

  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppSnackbarAC(null, null));
  };

  return (
    <Snackbar
      open={snackbarSeverity !== null}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};
