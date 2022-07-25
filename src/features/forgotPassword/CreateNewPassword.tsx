import React from 'react';

import { Paper } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../app/store';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import { CreateNewPasswordForm } from './createNewPasswordForm/CreateNewPasswordForm';
import style from './forgotPassword.module.css';

export const CreateNewPassword = (): ReturnComponentType => {
  const isDefinedToken = useAppSelector(state => state.forgot.token);

  if (isDefinedToken) {
    return <Navigate to={RoutePath.Login} />;
  }

  return (
    <Paper className={style.paper} elevation={12}>
      <h2>It-incubator</h2>
      <h3>Create new password</h3>
      <CreateNewPasswordForm />
    </Paper>
  );
};
