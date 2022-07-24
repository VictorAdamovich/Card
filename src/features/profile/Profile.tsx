import React from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../app/store';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';

export const Profile = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={RoutePath.Login} />;
  }

  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
};
