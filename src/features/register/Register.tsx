import React from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../app/store';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import { RegisterForm } from './registerForm/RegisterForm';

export const Register = (): ReturnComponentType => {
  const isRegister = useAppSelector(state => state.register.isRegister);

  if (isRegister) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Register</h2>
      <h3>SingUp</h3>
      <RegisterForm />
    </div>
  );
};
