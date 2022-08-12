import React, { ReactElement } from 'react';

import { Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export const UpdatePackButton = (setIsOpen: () => void): ReactElement => (
  <IconButton onClick={setIsOpen}>
    <Edit />
  </IconButton>
);
