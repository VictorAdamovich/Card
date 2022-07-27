import React from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button, FormControl, FormLabel, Grid } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/store';
import img from 'assets/images/ava-img.jpg';
import { FormWrapper } from 'common/components/formWrapper/FormWrapper';
import { RoutePath } from 'common/enums/route-path';
import { logOut, updateUserInfoTC } from 'features/login/login-reducer';
import { EditableSpan } from 'features/profile/EditableSpan';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Profile = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const userInfo = useAppSelector(state => state.login.userInfo);
  const appStatus = useAppSelector(state => state.app.status);

  const logoutCB = (): void => {
    dispatch(logOut());
  };
  const saveChangesHandler = (newValue: string): void => {
    dispatch(updateUserInfoTC({ name: newValue }));
  };
  const isDisabled = appStatus === 'loading';

  if (!isLoggedIn) {
    return <Navigate to={RoutePath.Login} />;
  }
  return (
    <FormWrapper>
      <h2>It-incubator</h2>
      <div>
        <img src={img} alt="avatar" width="200px" />
      </div>
      <Grid container xs={12} justifyContent="center">
        <FormControl>
          <FormLabel>
            <h2>Personal information</h2>
          </FormLabel>
          <EditableSpan
            value={userInfo.name}
            isDisabled={isDisabled}
            onChange={saveChangesHandler}
          />
          <Box color="gray" padding="20px">
            {userInfo.email}
          </Box>
          <Grid container justifyContent="space-around">
            <Button
              startIcon={<LogoutIcon />}
              variant="outlined"
              onClick={logoutCB}
              color="primary"
              disabled={isDisabled}
            >
              Log out
            </Button>
          </Grid>
        </FormControl>
      </Grid>
    </FormWrapper>
  );
};
