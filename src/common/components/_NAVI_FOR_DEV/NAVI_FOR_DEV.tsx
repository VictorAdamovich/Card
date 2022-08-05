import React from 'react';

import { AppBar, Box, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { AppTitle } from 'common/components/_NAVI_FOR_DEV/components/AppTitle';
import { IconMenu } from 'common/components/_NAVI_FOR_DEV/components/IconMenu';
import { RoutePath } from 'common/enums/route-path';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const NaviForDev = (): ReturnComponentType => (
  <div>
    <AppBar style={{ background: '#fff' }} position="static">
      <Toolbar style={{ justifyContent: 'space-around' }}>
        <AppTitle />
        <Box>
          <NavLink to={RoutePath.Error404}>404 </NavLink>-
          <NavLink to={RoutePath.Profile}> Profile </NavLink>-
          <NavLink to={RoutePath.Login}> Login </NavLink>-
          <NavLink to={RoutePath.Register}> Register </NavLink>-
          <NavLink to={RoutePath.ForgotPassword}> ForgotPassword </NavLink>-
          <NavLink to={RoutePath.CheckEmail}> CheckEmail </NavLink>-
          <NavLink to={RoutePath.CreateNewPassword}>CreateNewPassword </NavLink>-
        </Box>
        <IconMenu />
      </Toolbar>
    </AppBar>
  </div>
);
