import * as React from 'react';
import { useCallback } from 'react';

import Button from '@mui/material/Button';

import { UpdateCardForm } from 'features/cards/components/common/updateCardForm/UpdateCardForm';
import { ReturnComponentType } from 'types/ReturnComponentType';

type AddNewPackNamePropsType = {
  addNewCard: (question: string, answer: string) => void;
};

export const AddCardForm = React.memo(
  ({ addNewCard }: AddNewPackNamePropsType): ReturnComponentType => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = useCallback((): void => {
      setOpen(true);
    }, []);

    const closeHandler = (): void => {
      setOpen(false);
    };

    return (
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Add new card
        </Button>
        <UpdateCardForm
          open={open}
          closeHandler={closeHandler}
          createUpdateCard={addNewCard}
          formTitle="add"
        />
      </div>
    );
  },
);
