import React, { ReactElement } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useAppDispatch } from 'app/store';
import { deletePack } from 'features/packs/packs-reducer';

export const DeletePackModal = (
  isOpen: boolean,
  setIsOpen: (newIsOpen: boolean) => void,
  packId?: string,
  packName?: string,
): ReactElement => {
  const dispatch = useAppDispatch();

  const handleDeletePack = (): void => {
    if (packId) {
      dispatch(deletePack(packId));
    }
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Delete Pack</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure want delete this {packName} pack?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button onClick={handleDeletePack}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};
