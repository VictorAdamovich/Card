import React, { useEffect } from 'react';

import './App.css';

import { CircularProgress, LinearProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { SimpleSnackbar } from '../common/components/Snackbar/SimpleSnackbar';
import { RoutePath } from '../common/enums/route-path';
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
      <Router />
      <div>
        <NavLink to={RoutePath.ForgotPassword}> 1 </NavLink>
        <NavLink to={RoutePath.Login}> 2 </NavLink>
        <NavLink to={RoutePath.Error404}> 3 </NavLink>
      </div>
      <SimpleSnackbar />
    </div>
  );
};

export default App;
