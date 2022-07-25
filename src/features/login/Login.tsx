import React from 'react';

import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../app/store';
import { FormWrapper } from '../../common/components/FormWrapper/FormWrapper';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import { LoginForm } from './loginForm/LoginForm';

export const Login = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  const navigate = useNavigate();
  const handleClickCancelRegister = (): void => navigate(RoutePath.Register);

  if (isLoggedIn) {
    return <Navigate to={RoutePath.Profile} />;
  }

  return (
    <FormWrapper>
      <h2>It-incubator</h2>
      <h3>Sign In</h3>
      <LoginForm />
      <h4>Do not have an account? </h4>
      <Button onClick={handleClickCancelRegister}>Sign Up</Button>
    </FormWrapper>
  );
};
