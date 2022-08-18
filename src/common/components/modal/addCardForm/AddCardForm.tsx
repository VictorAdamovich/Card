import * as React from 'react';

import Button from '@mui/material/Button';

import { UpdateCardForm } from 'common/components/modal/updateCardForm/UpdateCardForm';
import { CreateUpdateCardPayloadType } from 'features/cards/Cards';
import { ReturnComponentType } from 'types/ReturnComponentType';

type AddNewPackNamePropsType = {
  addNewCard: (payload: CreateUpdateCardPayloadType) => void;
};

export const AddCardForm = React.memo(
  ({ addNewCard }: AddNewPackNamePropsType): ReturnComponentType => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClickOpen = (): void => {
      setIsOpen(true);
    };

    const closeHandler = (): void => {
      setIsOpen(false);
    };

    return (
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Add new card
        </Button>
        <UpdateCardForm
          isOpen={isOpen}
          closeHandler={closeHandler}
          createUpdateCard={addNewCard}
          formTitle="add"
          questionImg=""
          question=""
          answer=""
        />
      </div>
    );
  },
);
