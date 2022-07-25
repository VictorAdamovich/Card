import React, { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/store';
import { createNewPasswordSchema } from '../../../common/validation/formValidation';
import { ReturnComponentType } from '../../../types/ReturnComponentType';
import styles from '../../login/Login.module.css';
import { createNewPassword } from '../forgot-reducer';

export const CreateNewPasswordForm = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const url = useLocation();
  const tokenIndex = 2;
  const token = url.pathname.split('/')[tokenIndex];

  const appStatus = useAppSelector(state => state.app.status);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => setShowPassword(!showPassword);
  const handleOnBlurPassword = (): void => setShowPassword(false);
  const createNewPasswordForm = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: createNewPasswordSchema,
    onSubmit: () => {
      dispatch(createNewPassword(createNewPasswordForm.values.password, token));
      createNewPasswordForm.resetForm();
    },
  });

  const checkButtonStatus =
    appStatus === 'loading' || !!createNewPasswordForm.errors.password;

  return (
    <form onSubmit={createNewPasswordForm.handleSubmit} className={styles.form}>
      <FormControl>
        <TextField
          type={showPassword ? 'text' : 'password'}
          label="Password"
          margin="normal"
          variant="standard"
          {...createNewPasswordForm.getFieldProps('password')}
          error={
            createNewPasswordForm.touched.password &&
            Boolean(createNewPasswordForm.errors.password)
          }
          helperText={
            createNewPasswordForm.touched.password &&
            createNewPasswordForm.errors.password
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onBlur={handleOnBlurPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <p>Create new password and we will send you further instructions to email</p>

        <Button disabled={checkButtonStatus} type="submit" variant="contained">
          Create new password
        </Button>
      </FormControl>
    </form>
  );
};
