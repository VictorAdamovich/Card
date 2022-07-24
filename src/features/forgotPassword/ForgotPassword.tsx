import React from 'react';

import { Box, Button, FormControl, Paper, TextField } from '@mui/material';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../app/store';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';
import LogoArea from '../login/components/LogoArea';
import styles from '../login/Login.module.css';

export const ForgotPassword = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'Required field';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: () => {
      dispatch({ type: 'any' });
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
                <LogoArea title="Forgot your password?" />
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
                  <Grid item>
                    <p>
                      Enter your email address and we will send you further instructions
                    </p>
                  </Grid>
                  <Button
                    disabled={!!formik.errors.email}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Send Instruction
                  </Button>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <p>Did you remember your password?</p>
                    </Grid>
                    <Grid item>
                      <Link to={RoutePath.Login}>Try logging in</Link>
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
