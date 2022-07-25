import React from 'react';

import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';
import { logOut, updateUserInfoTC } from '../login/login-reducer';

export const Profile = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const userInfo = useAppSelector(state => state.login.userInfo);

  const logoutCB = (): void => {
    dispatch(logOut());
  };

  type FormikErrorType = {
    nickName?: string;
  };
  const formik = useFormik({
    initialValues: {
      nickName: userInfo.name,
    },
    validate: values => {
      const errors: FormikErrorType = {};
      const minLength = 3;
      if (!values.nickName) {
        errors.nickName = 'Required';
      } else if (values.nickName.length < minLength) {
        errors.nickName = 'Invalid nick name input more than 2 symbols';
      }
      return errors;
    },
    onSubmit: values => {
      dispatch(updateUserInfoTC({ name: values.nickName }));
    },
  });
  if (!isLoggedIn) {
    return <Navigate to={RoutePath.Login} />;
  }
  return (
    <Grid container justifyContent="space-around">
      <Paper elevation={12}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <h2>Personal information</h2>
            </FormLabel>
            <FormGroup>
              <TextField
                margin="normal"
                label="Nickname"
                {...formik.getFieldProps('nickName')}
              />
              <div style={{ color: 'red' }}>{formik.errors.nickName}</div>
              <TextField
                margin="normal"
                label="Email"
                value={userInfo.email}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Grid>
                <Button variant="outlined" color="error">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
                <Button onClick={logoutCB} variant="contained" color="primary">
                  Logout
                </Button>
              </Grid>
            </FormGroup>
          </FormControl>
        </form>
      </Paper>
    </Grid>
  );
};
