import React, { ChangeEvent, useCallback } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import { ReturnComponentType } from '../../../types/ReturnComponentType';

type PropsType = {
  hasError: boolean | undefined;
  value: string;
  handleChanging: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<any, Element>) => void;
};

const PasswordWithVisibility = React.memo((props: PropsType): ReturnComponentType => {
  const { hasError, handleChanging, value, onBlur } = props;

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    handleChanging(event);
  }, []);

  const handleClickShowPassword = useCallback((): void => {
    setShowPassword(!showPassword);
  }, [showPassword]);

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
        onBlur={onBlur}
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
});

export default PasswordWithVisibility;
