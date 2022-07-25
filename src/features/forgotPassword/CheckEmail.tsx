import React from 'react';

import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../app/store';
import img from '../../assets/images/checkEmail.svg';
import { RoutePath } from '../../common/enums/route-path';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import style from './forgotPassword.module.css';

export const CheckEmail = (): ReturnComponentType => {
  const navigate = useNavigate();
  const handleClickCancelRegister = (): void => navigate(RoutePath.Register);

  const email = useAppSelector(state => state.forgot.email);

  return (
    <Paper className={style.paper} elevation={12}>
      <h2>It-incubator</h2>
      <div>
        <img src={img} alt="logo" width="200px" />
      </div>
      <h4>Check email {email}</h4>
      <p>We’ve sent an Email with instructions to {email || 'example@mail.com'}</p>
      <Button onClick={handleClickCancelRegister}>Back to login</Button>
    </Paper>
  );
};
