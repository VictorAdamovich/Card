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
import { registerApi } from '../register-api';

import { validationsSchema } from './registerFormValidation';

export const RegisterForm = (): ReturnComponentType => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = (): void => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = (): void =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleOnBlurPassword = (): void => setShowPassword(false);
  const handleOnBlurConfirmPassword = (): void => setShowConfirmPassword(false);
  const registerForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationsSchema,
    onSubmit: (values, { resetForm }) => {
      registerApi.createUser(values.email, values.password).then(res => console.log(res));
      resetForm();
    },
  });

  return (
    <form onSubmit={registerForm.handleSubmit}>
      <FormControl>
        <FormGroup>
          <TextField
            label="Email"
            margin="normal"
            variant="standard"
            name="email"
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            error={registerForm.touched.email && Boolean(registerForm.errors.email)}
            helperText={registerForm.touched.email && registerForm.errors.email}
          />

          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            margin="normal"
            variant="standard"
            name="password"
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            error={registerForm.touched.password && Boolean(registerForm.errors.password)}
            helperText={registerForm.touched.password && registerForm.errors.password}
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

          <TextField
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm password"
            margin="normal"
            variant="standard"
            name="confirmPassword"
            value={registerForm.values.confirmPassword}
            onChange={registerForm.handleChange}
            error={
              registerForm.touched.confirmPassword &&
              Boolean(registerForm.errors.confirmPassword)
            }
            helperText={
              registerForm.touched.confirmPassword && registerForm.errors.confirmPassword
            }
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

          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </FormGroup>
      </FormControl>
    </form>
  );
};
