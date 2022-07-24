import React from 'react';

import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';
import { logOut } from '../login/login-reducer';

export const Profile = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const dispatch = useAppDispatch();

  const logoutCB = (): void => {
    dispatch(logOut());
  };

  if (!isLoggedIn) {
    return <Navigate to={RoutePath.Login} />;
  }

  return (
    <div>
      <h2>Profile</h2>
      <button type="button" onClick={logoutCB}>
        LOGOUT
      </button>
    </div>
  );
};
