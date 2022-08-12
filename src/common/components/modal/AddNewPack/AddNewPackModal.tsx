import React, { ReactElement } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { useAppDispatch } from 'app/store';
import { createNewPack } from 'features/packs/packs-reducer';

export const AddNewPackModal = (
  isOpen: boolean,
  setIsOpen: (newIsOpen: boolean) => void,
): ReactElement => {
  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState('');

  const handleAddNewPack = (): void => {
    dispatch(createNewPack(value));
    setIsOpen(false);
    setValue('');
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Add new Pack</DialogTitle>
      <DialogContent>
        <DialogContentText>
          For adding new pack you should add name of new pack.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="newPackName"
          label="New pack name"
          type="text"
          value={value}
          onChange={e => setValue(e.currentTarget.value)}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button onClick={handleAddNewPack}>Add new Pack name</Button>
      </DialogActions>
    </Dialog>
  );
};
