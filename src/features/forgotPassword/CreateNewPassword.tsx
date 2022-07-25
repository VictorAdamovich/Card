import React from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../app/store';
import { FormWrapper } from '../../common/components/FormWrapper/FormWrapper';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import { CreateNewPasswordForm } from './createNewPasswordForm/CreateNewPasswordForm';

export const CreateNewPassword = (): ReturnComponentType => {
  const isDefinedToken = useAppSelector(state => state.forgot.token);

  if (isDefinedToken) {
    return <Navigate to={RoutePath.Login} />;
  }

  return (
    <FormWrapper>
      <h2>It-incubator</h2>
      <h3>Create new password</h3>
      <CreateNewPasswordForm />
    </FormWrapper>
  );
};
