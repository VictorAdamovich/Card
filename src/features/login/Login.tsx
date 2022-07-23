import React from 'react';

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../app/store';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import { logIn } from './login-reducer';
import styles from './Login.module.css';
import PasswordWithVisibility from './PasswordWithVisibility';

export const Login = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const minPasswordLength = 7;

  type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'Required field';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (values.password.length <= minPasswordLength) {
        errors.password = `Password should includes more than ${minPasswordLength} characters`;
      }
      return errors;
    },
    onSubmit: () => {
      dispatch(
        logIn(formik.values.email, formik.values.password, formik.values.rememberMe),
      );
      formik.resetForm();
    },
  });
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} className={styles.loginContainer}>
        <Paper className={styles.paperCont} elevation={12}>
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <Container component="main" maxWidth="xs" className={styles.formContainer}>
              <Box
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} className={styles.title}>
                  logo will be here
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <FormControl className={styles.formControl}>
                  <TextField
                    error={formik.touched.email && !!formik.errors.email}
                    className={styles.inputArea}
                    name="email"
                    type="email"
                    margin="normal"
                    label="Email address"
                    autoComplete="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    required
                  />
                  {formik.touched.email && (
                    <div className={styles.errorMessage}>{formik.errors.email}</div>
                  )}
                  {/* <TextField
                    error={formik.touched.password && !!formik.errors.password}
                    required
                    margin="normal"
                    name="password"
                    type="password"
                    label="Password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    autoComplete="current-password"
                  /> */}
                  <PasswordWithVisibility
                    hasError={formik.touched.password && !!formik.errors.password}
                    value={formik.values.password}
                    handleChanging={formik.handleChange}
                  />
                  {formik.touched.password && (
                    <div className={styles.errorMessage}>{formik.errors.password}</div>
                  )}
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={formik.handleChange}
                            checked={formik.values.rememberMe}
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
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link to={RoutePath.Register}>Do not have an account? Sign Up</Link>
                    </Grid>
                  </Grid>
                </FormControl>
              </Box>
            </Container>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
