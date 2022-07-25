import React, { ChangeEvent, useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material';

import { ReturnComponentType } from '../../../types/ReturnComponentType';

type PropsType = {
  name: string;
  error: any;
  value: string;
  helperText: any;
  handleChanging: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const PasswordWithVisibility = React.memo(
  (props: PropsType): ReturnComponentType => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = (): void => setShowPassword(!showPassword);
    const handleOnBlurPassword = (): void => setShowPassword(false);
    return (
      <FormControl>
        <TextField
          type={showPassword ? 'text' : 'password'}
          label="Password"
          margin="normal"
          variant="standard"
          name={props.name}
          value={props.value}
          error={props.error}
          helperText={props.helperText}
          onChange={props.handleChanging}
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
      </FormControl>
    );
  },
);
