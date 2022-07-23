import React, { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';

import { ReturnComponentType } from '../../../types/ReturnComponentType';

export const RegisterForm = (): ReturnComponentType => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = (): void => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = (): void =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleOnBlurPassword = (): void => setShowPassword(false);
  const handleOnBlurConfirmPassword = (): void => setShowConfirmPassword(false);

  const formik = useFormik({
    validate: values => {
      const errors: any = {};
      if (!values.email) {
        return {
          email: 'Email is required',
        };
      }
      if (!values.password) {
        return {
          password: 'Password is required',
        };
      }
      if (!values.confirmPassword) {
        return {
          confirmPassword: 'Пароли должны совтодать!',
        };
      }
      return errors;
    },
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormGroup>
          <TextField
            label="Email"
            margin="normal"
            name="email"
            variant="standard"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            margin="normal"
            variant="standard"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
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
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
          <TextField
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm password"
            margin="normal"
            variant="standard"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirmPassword visibility"
                    onClick={handleClickShowConfirmPassword}
                    onBlur={handleOnBlurConfirmPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}

          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </FormGroup>
      </FormControl>
    </form>
  );
};
