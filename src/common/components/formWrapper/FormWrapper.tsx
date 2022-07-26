import React from 'react';

import { Paper } from '@mui/material';

import { ReturnComponentType } from '../../../types/ReturnComponentType';

import style from './FormWrapper.module.css';

export const FormWrapper = React.memo(
  (props: PropsType): ReturnComponentType => (
    <Paper className={style.paper} elevation={12}>
      {props.children}
    </Paper>
  ),
);

type PropsType = {
  children: JSX.Element | JSX.Element[];
};
