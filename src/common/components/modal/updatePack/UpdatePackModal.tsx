import React, { ReactElement } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { useAppDispatch } from 'app/store';
import { updatePack } from 'features/packs/packs-reducer';

export const UpdatePackModal = (
  isOpen: boolean,
  setIsOpen: (newIsOpen: boolean) => void,
  packId?: string,
): ReactElement => {
  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState('');

  const handleUpdatePack = (): void => {
    if (packId) {
      dispatch(updatePack(packId, value));
    }
    setIsOpen(false);
    setValue('');
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Update pack name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          For updating pack you should add new name of pack.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="newPackName"
          label="New pack's name"
          type="text"
          value={value}
          onChange={e => setValue(e.currentTarget.value)}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button onClick={handleUpdatePack}>Update Pack name</Button>
      </DialogActions>
    </Dialog>
  );
};
