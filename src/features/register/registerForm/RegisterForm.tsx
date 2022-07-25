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
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/store';
import { RoutePath } from '../../../common/enums/route-path';
import { registerSchema } from '../../../common/validation/formValidation';
import { ReturnComponentType } from '../../../types/ReturnComponentType';
import { register } from '../register-reducer';

export const RegisterForm = React.memo((): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const appStatus = useAppSelector(state => state.app.status);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = (): void => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = (): void =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleOnBlurPassword = (): void => setShowPassword(false);
  const handleOnBlurConfirmPassword = (): void => setShowConfirmPassword(false);

  const handleClickCancelRegister = (): void => navigate(RoutePath.Login);

  const registerForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(register(values.email, values.password));
      resetForm();
    },
  });

  const checkButtonStatus =
    appStatus === 'loading' ||
    !!registerForm.errors.email ||
    !!registerForm.errors.password;

  return (
    <form onSubmit={registerForm.handleSubmit}>
      <FormControl>
        <FormGroup>
          <TextField
            label="Email"
            margin="normal"
            variant="standard"
            error={registerForm.touched.email && Boolean(registerForm.errors.email)}
            helperText={registerForm.touched.email && registerForm.errors.email}
            {...registerForm.getFieldProps('email')}
          />

          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            margin="normal"
            variant="standard"
            {...registerForm.getFieldProps('password')}
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
            {...registerForm.getFieldProps('confirmPassword')}
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
          <Button onClick={handleClickCancelRegister}>Cancel</Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={checkButtonStatus}
          >
            Regist
          </Button>
        </FormGroup>
      </FormControl>
    </form>
  );
});
