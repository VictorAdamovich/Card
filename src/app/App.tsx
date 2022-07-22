import React from 'react';

import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import Error404 from '../common/components/404NotFound/Error404';
import { RoutePath } from '../common/enums/route-path';
import { CheckEmail } from '../features/forgotPassword/CheckEmail';
import { CreateNewPassword } from '../features/forgotPassword/CreateNewPassword';
import { ForgotPassword } from '../features/forgotPassword/ForgotPassword';
import { Login } from '../features/login/Login';
import { Profile } from '../features/profile/Profile';
import { Register } from '../features/register/Register';

const App = (): any => (
  <div className="App">
    <Routes>
      <Route path={RoutePath.Error404} element={<Error404 />} />
      <Route path={RoutePath.Login} element={<Login />} />
      <Route path={RoutePath.Profile} element={<Profile />} />
      <Route path={RoutePath.Register} element={<Register />} />
      <Route path={RoutePath.ForgotPassword} element={<ForgotPassword />} />
      <Route path={RoutePath.CheckEmail} element={<CheckEmail />} />
      <Route path={RoutePath.CreateNewPassword} element={<CreateNewPassword />} />
      <Route path="*" element={<Navigate to="/testPage" />} />
    </Routes>
  </div>
);

export default App;
