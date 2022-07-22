import React from 'react';

import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import Error404 from '../common/components/404NotFound/Error404';
import { RoutesPath } from '../common/enums/routes-path';
import { CheckEmail } from '../features/forgotPassword/CheckEmail';
import { CreateNewPassword } from '../features/forgotPassword/CreateNewPassword';
import { ForgotPassword } from '../features/forgotPassword/ForgotPassword';
import { Login } from '../features/login/Login';
import { Profile } from '../features/profile/Profile';
import { Register } from '../features/register/Register';

const App = (): any => (
  <div className="App">
    <Routes>
      <Route path={RoutesPath.error404} element={<Error404 />} />
      <Route path={RoutesPath.login} element={<Login />} />
      <Route path={RoutesPath.profile} element={<Profile />} />
      <Route path={RoutesPath.register} element={<Register />} />
      <Route path={RoutesPath.forgotPassword} element={<ForgotPassword />} />
      <Route path={RoutesPath.checkEmail} element={<CheckEmail />} />
      <Route path={RoutesPath.createNewPassword} element={<CreateNewPassword />} />
      <Route path="*" element={<Navigate to="/testPage" />} />
    </Routes>
  </div>
);

export default App;
