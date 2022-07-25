import React from 'react';

import { Button, Paper } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../app/store';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';
import styles from '../login/Login.module.css';

import { ForgotPasswordForm } from './forgotPasswordForm/forgotPasswordForm';

export const ForgotPassword = (): ReturnComponentType => {
  const email = useAppSelector(state => state.forgot.email);

  const navigate = useNavigate();
  const handleClickCancelRegister = (): void => navigate(RoutePath.Login);

  if (email) {
    return <Navigate to={RoutePath.CheckEmail} />;
  }

  return (
    <Paper className={styles.paper} elevation={12}>
      <h2>It-incubator</h2>
      <h3>Forgot your password ?</h3>
      <ForgotPasswordForm />
      <h4>Did you remember your password?</h4>
      <Button onClick={handleClickCancelRegister}>Try logging in</Button>
    </Paper>
  );
};
