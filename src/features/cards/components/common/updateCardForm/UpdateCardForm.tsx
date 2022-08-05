import React, { useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  createUpdateCard: (question: string, answ: string) => void;
  formTitle: string;
  open: boolean;
  closeHandler: () => void;
};

export const UpdateCardForm = ({
  open,
  closeHandler,
  createUpdateCard,
  formTitle,
}: PropsType): ReturnComponentType => {
  const [answ, setAnsw] = React.useState<string>('');
  const [question, setQuestion] = React.useState<string>('');

  const handleClose = useCallback((): void => {
    closeHandler();
  }, []);

  const handleUpdateCard = (): void => {
    createUpdateCard(question, answ);
    closeHandler();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formTitle} card</DialogTitle>
        <DialogContent>
          <DialogContentText>
            For {formTitle}ing card you should {formTitle} question and answer of the
            card.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="cardQuestion"
            label="Card question"
            type="text"
            onChange={e => setQuestion(e.currentTarget.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="cardAnsw"
            label="Card answer"
            type="text"
            onChange={e => setAnsw(e.currentTarget.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateCard}>{formTitle} card</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
