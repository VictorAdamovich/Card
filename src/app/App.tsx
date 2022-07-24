import React from 'react';

import './App.css';
import { LinearProgress } from '@mui/material';

import Router from '../routes/Router';
import { ReturnComponentType } from '../types/ReturnComponentType';

import { useAppSelector } from './store';

const App = (): ReturnComponentType => {
  const status = useAppSelector(state => state.app.status);
  return (
    <div className="App">
      {status === 'loading' && <LinearProgress />}
      <Router />
    </div>
  );
};

export default App;
