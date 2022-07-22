import React from 'react';

import './App.css';
import { Routes } from 'react-router-dom';

import Router from '../routes/Router';
import { ReturnComponentType } from '../types/ReturnComponentType';

const App = (): ReturnComponentType => (
  <div className="App">
    <Routes>
      <Router />
    </Routes>
  </div>
);

export default App;
