/*
import React from 'react';

import { ReturnComponentType } from 'types/ReturnComponentType';

export const AddNewPackName = (): ReturnComponentType => <div />;
*/

import * as React from 'react';
import { useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { ReturnComponentType } from 'types/ReturnComponentType';

type AddNewPackNamePropsType = {
  addNewPackName: (value: string) => void;
};

export const AddNewPackName = React.memo(
  (props: AddNewPackNamePropsType): ReturnComponentType => {
    const { addNewPackName } = props;

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    const handleClickOpen = useCallback((): void => {
      setOpen(true);
    }, []);

    const handleClose = useCallback((): void => {
      setOpen(false);
    }, []);

    const handleAddNewPack = (): void => {
      setOpen(false);
      addNewPackName(value);
    };
    return (
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Add new pack
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new pack</DialogTitle>
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddNewPack}>Add new pack name</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
);
