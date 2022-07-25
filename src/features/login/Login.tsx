import React, { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import { Link, Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { RoutePath } from '../../common/enums/route-path';
import { loginSchema } from '../../common/validation/formValidation';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import LogoArea from './components/LogoArea';
import { logIn } from './login-reducer';
import styles from './Login.module.css';

export const Login = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => setShowPassword(!showPassword);
  const handleOnBlurPassword = (): void => setShowPassword(false);

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: () => {
      dispatch(
        logIn(
          loginForm.values.email,
          loginForm.values.password,
          loginForm.values.rememberMe,
        ),
      );
      loginForm.resetForm();
    },
  });

  if (isLoggedIn) {
    return <Navigate to={RoutePath.Profile} />;
  }
  return (
    <Paper className={styles.paper} elevation={12}>
      <LogoArea title="Sign In" />
      <form onSubmit={loginForm.handleSubmit} className={styles.form}>
        <FormControl>
          <TextField
            label="Email"
            margin="normal"
            variant="standard"
            error={loginForm.touched.email && Boolean(loginForm.errors.email)}
            helperText={loginForm.touched.email && loginForm.errors.email}
            {...loginForm.getFieldProps('email')}
          />

          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            margin="normal"
            variant="standard"
            {...loginForm.getFieldProps('password')}
            error={loginForm.touched.password && Boolean(loginForm.errors.password)}
            helperText={loginForm.touched.password && loginForm.errors.password}
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
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={loginForm.handleChange}
                    checked={loginForm.values.rememberMe}
                    name="rememberMe"
                    color="primary"
                  />
                }
                label="Remember me"
              />
            </Grid>
            <Grid item>
              <Link to={RoutePath.ForgotPassword}>Forgot password?</Link>
            </Grid>
          </Grid>
          <Button
            disabled={!!loginForm.errors.email || !!loginForm.errors.password}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link to={RoutePath.Register}>Do not have an account? Sign Up</Link>
        </FormControl>
      </form>
    </Paper>
  );
};
