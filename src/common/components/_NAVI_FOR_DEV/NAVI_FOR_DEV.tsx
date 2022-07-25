import React from 'react';

import { NavLink } from 'react-router-dom';

import { ReturnComponentType } from '../../../types/ReturnComponentType';
import { RoutePath } from '../../enums/route-path';

export const NaviForDev = (): ReturnComponentType => (
  <div>
    <NavLink to={RoutePath.Error404}>404 </NavLink>-
    <NavLink to={RoutePath.Profile}>Profile </NavLink>-
    <NavLink to={RoutePath.Login}>Login </NavLink>-
    <NavLink to={RoutePath.Register}>Register </NavLink>-
    <NavLink to={RoutePath.ForgotPassword}>ForgotPassword </NavLink>-
    <NavLink to={RoutePath.CheckEmail}>CheckEmail </NavLink>-
    <NavLink to={RoutePath.CreateNewPassword}>CreateNewPassword </NavLink>-
  </div>
);
