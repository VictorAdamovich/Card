import React, { ReactElement } from 'react';

import Button from '@mui/material/Button';

export const AddNewPackButton = (setIsOpen: () => void): ReactElement => (
  <Button variant="contained" onClick={setIsOpen}>
    Add new Pack
  </Button>
);
