import React from 'react';

import { Route } from 'react-router-dom';

import Error404 from '../common/components/404NotFound/Error404';
import { RoutePath } from '../common/enums/route-path';
import { CheckEmail } from '../features/forgotPassword/CheckEmail';
import { CreateNewPassword } from '../features/forgotPassword/CreateNewPassword';
import { ForgotPassword } from '../features/forgotPassword/ForgotPassword';
import { Login } from '../features/login/Login';
import { Profile } from '../features/profile/Profile';
import { Register } from '../features/register/Register';
import { ReturnComponentType } from '../types/ReturnComponentType';
import { RoutesType } from '../types/RoutesType';

export const Router = (): ReturnComponentType => {
  const routesArray: RoutesType[] = [
    { path: RoutePath.Error404, component: <Error404 /> },
    { path: RoutePath.Error404, component: <CheckEmail /> },
    { path: RoutePath.Error404, component: <CreateNewPassword /> },
    { path: RoutePath.Error404, component: <ForgotPassword /> },
    { path: RoutePath.Error404, component: <Login /> },
    { path: RoutePath.Error404, component: <Profile /> },
    { path: RoutePath.Error404, component: <Register /> },
    { path: RoutePath.Error404, component: <Error404 /> },
  ];

  return (
    <div>
      {routesArray.map(item => (
        <Route key={item.path} path={item.path} element={item.component} />
      ))}
    </div>
  );
};

export default Router;
