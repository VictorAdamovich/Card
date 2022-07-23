import React, { ChangeEvent, useCallback } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

import { ReturnComponentType } from '../../types/ReturnComponentType';

type PropsType = {
  hasError: boolean | undefined;
  value: string;
  handleChanging: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PasswordWithVisibility = (props: PropsType): ReturnComponentType => {
  const { hasError, handleChanging, value } = props;

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    handleChanging(event);
  }, []);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  /* const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };
  onMouseDown={handleMouseDownPassword} */

  return (
    <FormControl variant="outlined">
      <InputLabel error={hasError} htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        required
        name="password"
        error={hasError}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
};

export default PasswordWithVisibility;
