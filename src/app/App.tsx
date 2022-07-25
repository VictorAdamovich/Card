import React, { useEffect } from 'react';

import './App.css';

import { CircularProgress, LinearProgress } from '@mui/material';

import { NaviForDev } from '../common/components/NAVI_FOR_DEV/NAVI_FOR_DEV';
import { SimpleSnackbar } from '../common/components/Snackbar/SimpleSnackbar';
import Router from '../routes/Router';
import { ReturnComponentType } from '../types/ReturnComponentType';

import { me } from './app-reducer';
import { useAppDispatch, useAppSelector } from './store';

const App = (): ReturnComponentType => {
  const status = useAppSelector(state => state.app.status);
  const isInit = useAppSelector(state => state.app.isInit);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('APP Start');
    dispatch(me());
  }, []);

  if (!isInit) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="App">
      {status === 'loading' && <LinearProgress />}
      <NaviForDev />
      <Router />
      <SimpleSnackbar />
    </div>
  );
};

export default App;
