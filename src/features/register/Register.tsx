import React from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../app/store';
import { FormWrapper } from '../../common/components/FormWrapper/FormWrapper';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import { RegisterForm } from './registerForm/RegisterForm';

export const Register = React.memo((): ReturnComponentType => {
  const isRegister = useAppSelector(state => state.register.isRegister);

  if (isRegister) {
    return <Navigate to={RoutePath.Login} />;
  }

  return (
    <FormWrapper>
      <h2>It-incubator</h2>
      <h3>SingUp</h3>
      <RegisterForm />
    </FormWrapper>
  );
});
