import React from 'react';

import { Box, Button, Paper } from '@mui/material';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line import/order
import img from '../../assets/images/checkEmail.svg';

// import { useAppSelector } from '../../app/store';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';
import LogoArea from '../login/components/LogoArea';
import styles from '../login/Login.module.css';

export const CheckEmail = (): ReturnComponentType => {
  // const email = useAppSelector();
  const email = 'example';

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} className={styles.loginContainer}>
        <Paper className={styles.paperCont} elevation={12}>
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
              <LogoArea title="Check your email" />
              <Grid item>
                <img src={img} alt="logo" />
              </Grid>
              <Grid item>
                <p>We’ve sent an Email with instructions to {email}</p>
              </Grid>
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                <NavLink
                  to={RoutePath.Login}
                  style={{
                    textDecoration: 'ButtonText',
                    color: 'white',
                    width: 'inherit',
                  }}
                >
                  Back to login
                </NavLink>
              </Button>
            </Box>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
};
