import React, { ReactElement } from 'react';

import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export const DeletePackButton = (setIsOpen: () => void): ReactElement => (
  <IconButton onClick={setIsOpen}>
    <Delete />
  </IconButton>
);
