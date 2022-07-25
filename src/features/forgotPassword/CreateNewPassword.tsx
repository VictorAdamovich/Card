import React from 'react';

import { Box, Button, FormControl, Paper } from '@mui/material';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/store';
import PasswordWithVisibility from '../../common/components/PasswordWithVisibility/PasswordWithVisibility';
import { minPasswordLength } from '../../common/constants/constants';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';
import LogoArea from '../login/components/LogoArea';
import styles from '../login/Login.module.css';

import { createNewPassword } from './forgot-reducer';

export const CreateNewPassword = (): ReturnComponentType => {
  const isDefinedToken = useAppSelector(state => state.forgot.token);

  const dispatch = useAppDispatch();
  const url = useLocation();
  const tokenIndex = 2;
  const token = url.pathname.split('/')[tokenIndex];

  type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
  };

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: values => {
      const errors: FormikErrorType = {};
      if (values.password.length <= minPasswordLength) {
        errors.password = `Password should includes more than ${minPasswordLength} characters`;
      }
      return errors;
    },
    onSubmit: () => {
      dispatch(createNewPassword(formik.values.password, token));
      formik.resetForm();
    },
  });

  if (isDefinedToken) {
    return <Navigate to={RoutePath.Login} />;
  }

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
                <LogoArea title="Create new password" />
                <div style={{ marginTop: '20px' }} />
                <FormControl className={styles.formControl}>
                  <PasswordWithVisibility
                    hasError={formik.touched.password && !!formik.errors.password}
                    value={formik.values.password}
                    handleChanging={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && (
                    <div className={styles.errorMessage}>{formik.errors.password}</div>
                  )}
                  <Grid item>
                    <p>
                      Create new password and we will send you further instructions to
                      email
                    </p>
                  </Grid>
                  <Button
                    disabled={!!formik.errors.password}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Create new password
                  </Button>
                </FormControl>
              </Box>
            </Container>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
