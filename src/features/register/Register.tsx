import React from 'react';

import { Paper } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../app/store';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import style from './register.module.css';
import { RegisterForm } from './registerForm/RegisterForm';

export const Register = React.memo((): ReturnComponentType => {
  const isRegister = useAppSelector(state => state.register.isRegister);

  if (isRegister) {
    return <Navigate to={RoutePath.Login} />;
  }

  return (
    <Paper className={style.paper} elevation={12}>
      <h2>Register</h2>
      <h3>SingUp</h3>
      <RegisterForm />
    </Paper>
  );
});
