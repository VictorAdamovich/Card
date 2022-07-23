import React from 'react';

import './App.css';

import Router from '../routes/Router';
import { ReturnComponentType } from '../types/ReturnComponentType';

const App = (): ReturnComponentType => (
  <div className="App">
    <Router />
  </div>
);

export default App;
