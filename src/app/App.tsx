import React from 'react';

import './App.css';

import { NavLink } from 'react-router-dom';

import { RoutePath } from '../common/enums/route-path';
import Router from '../routes/Router';
import { ReturnComponentType } from '../types/ReturnComponentType';

const App = (): ReturnComponentType => (
  <div className="App">
    АПП
    <Router />
    <div>
      <NavLink to={RoutePath.ForgotPassword}> 1 </NavLink>
      <NavLink to={RoutePath.Login}> 2 </NavLink>
      <NavLink to={RoutePath.Error404}> 3 </NavLink>
    </div>
  </div>
);

export default App;
