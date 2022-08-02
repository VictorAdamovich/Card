import React, { useCallback } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Badge, Box, Button, FormControl, FormLabel, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/store';
import defaultImage from 'assets/images/ava-img.jpg';
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
  const saveChangesHandler = useCallback(
    (newValue: string): void => {
      dispatch(updateUserInfoTC({ name: newValue }));
    },
    [dispatch],
  );
  const isDisabled = appStatus === 'loading';

  if (!isLoggedIn) {
    return <Navigate to={RoutePath.Login} />;
  }

  return (
    <FormWrapper>
      <h2>It-incubator</h2>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <PhotoCameraIcon
            color="disabled"
            onClick={() => console.log('Set New Avatar')}
          />
        }
      >
        <Avatar
          alt="User"
          src={userInfo.avatar || defaultImage}
          sx={{ width: 150, height: 150 }}
        />
      </Badge>
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
