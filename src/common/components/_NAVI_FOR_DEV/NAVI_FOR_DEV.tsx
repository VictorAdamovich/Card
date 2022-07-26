import React from 'react';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { RoutePath } from 'common/enums/route-path';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const NaviForDev = (): ReturnComponentType => (
  <div>
    <AppBar style={{ background: '#EBE0E9' }} position="static">
      <Toolbar style={{ justifyContent: 'space-around' }}>
        <Typography variant="h5">It-incubator</Typography>
        <Box>
          <NavLink to={RoutePath.Error404}>404 </NavLink>-
          <NavLink to={RoutePath.Profile}> Profile </NavLink>-
          <NavLink to={RoutePath.Login}> Login </NavLink>-
          <NavLink to={RoutePath.Register}> Register </NavLink>-
          <NavLink to={RoutePath.ForgotPassword}> ForgotPassword </NavLink>-
          <NavLink to={RoutePath.CheckEmail}> CheckEmail </NavLink>-
          <NavLink to={RoutePath.CreateNewPassword}>CreateNewPassword </NavLink>-
        </Box>
      </Toolbar>
    </AppBar>
  </div>
);
