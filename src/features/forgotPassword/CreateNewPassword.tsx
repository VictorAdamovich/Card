import React from 'react';

import { Box, Button, FormControl, Paper } from '@mui/material';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';

import { useAppDispatch } from '../../app/store';
import { minPasswordLength } from '../../common/constants/constants';
import { ReturnComponentType } from '../../types/ReturnComponentType';
import LogoArea from '../login/components/LogoArea';
import PasswordWithVisibility from '../login/components/PasswordWithVisibility';
import styles from '../login/Login.module.css';

export const CreateNewPassword = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

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
