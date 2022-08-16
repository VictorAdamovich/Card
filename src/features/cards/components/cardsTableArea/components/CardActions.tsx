import React, { useState } from 'react';

import { Delete, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch } from 'app/store';
import { deletePackCardTC, updatePackCardTC } from 'features/cards/cards-reducer';
import { UpdateCardForm } from 'features/cards/components/common/updateCardForm/UpdateCardForm';

type ActionsPropsType = {
  packId: string;
  cardId: string;
};

export const CardActions = (props: ActionsPropsType): React.ReactElement => {
  const { packId, cardId } = props;
  const dispatch = useAppDispatch();

  const [edit, setEdit] = useState<boolean>(false);

  const handleClickDeleteCard = (): void => {
    dispatch(deletePackCardTC(packId, cardId));
  };
  const handleClickUpdateCard = (): void => {
    setEdit(true);
  };

  const updateCard = (question: string, answ: string): void => {
    dispatch(updatePackCardTC(packId, cardId, question, answ));
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <IconButton size="small" onClick={handleClickUpdateCard}>
        <Edit />
      </IconButton>
      <IconButton size="small" onClick={handleClickDeleteCard}>
        <Delete />
      </IconButton>
      {edit && (
        <UpdateCardForm
          open={edit}
          closeHandler={() => {
            setEdit(false);
          }}
          createUpdateCard={updateCard}
          formTitle="edit"
        />
      )}
    </div>
  );
};
