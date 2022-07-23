import React from 'react';

import { ReturnComponentType } from '../../types/ReturnComponentType';

import { RegisterForm } from './registerForm/RegisterForm';

export const Register = (): ReturnComponentType => (
  <div>
    <h2>Register</h2>
    <h3>SingUp</h3>
    <RegisterForm />
  </div>
);
