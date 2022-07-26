import React from 'react';

import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';

import img from '../../assets/images/ava-img.jpg';
import { logOut, updateUserInfoTC } from '../login/login-reducer';

import { useAppDispatch, useAppSelector } from 'app/store';
import { FormWrapper } from 'common/components/formWrapper/FormWrapper';
import { RoutePath } from 'common/enums/route-path';
import { changeNickNameSchema } from 'common/validation/formValidation';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Profile = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const userInfo = useAppSelector(state => state.login.userInfo);
  const appStatus = useAppSelector(state => state.app.status);

  const logoutCB = (): void => {
    dispatch(logOut());
  };
  const isDisabled = appStatus === 'loading';

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nickName: userInfo.name,
    },
    validationSchema: changeNickNameSchema,
    onSubmit: values => {
      dispatch(updateUserInfoTC({ name: values.nickName }));
    },
  });
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
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <h2>Personal information</h2>
            </FormLabel>
            <FormGroup>
              <TextField
                margin="normal"
                variant="standard"
                label="Nickname"
                error={Boolean(formik.errors.nickName)}
                helperText={formik.errors.nickName}
                {...formik.getFieldProps('nickName')}
              />
              <TextField
                margin="normal"
                variant="standard"
                label="Email"
                value={userInfo.email}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Grid container justifyContent="space-between">
                <Button
                  variant="outlined"
                  onClick={() => formik.resetForm()}
                  disabled={isDisabled}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  color="primary"
                  disabled={isDisabled || !!formik.errors.nickName}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={logoutCB}
                  color="primary"
                  disabled={isDisabled}
                >
                  Log out
                </Button>
              </Grid>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </FormWrapper>
  );
};
