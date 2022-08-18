import React, { useCallback, useState } from 'react';

import { Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch } from 'app/store';
import { DeleteCardModal } from 'common/components/modal/deleteCardModal/DeleteCardModal';
import { UpdateCardForm } from 'common/components/modal/updateCardForm/UpdateCardForm';
import { CreateUpdateCardPayloadType } from 'features/cards/Cards';
import { updatePackCardTC } from 'features/cards/cards-reducer';

type ActionsPropsType = {
  packId: string;
  cardId: string;
  answer: string;
  question: string;
  questionImg: string;
  canUserChangingCard: boolean;
};

export const CardActions = React.memo((props: ActionsPropsType): React.ReactElement => {
  const { packId, cardId, questionImg, question, answer, canUserChangingCard } = props;
  const dispatch = useAppDispatch();

  const [edit, setEdit] = useState<boolean>(false);

  const handleClickUpdateCard = useCallback((): void => {
    setEdit(true);
  }, []);

  const updateCard = (payload: CreateUpdateCardPayloadType): void => {
    dispatch(
      updatePackCardTC({
        packId,
        _id: cardId,
        questionImg: payload.questionImg,
        question: payload.question,
        answer: payload.answer,
      }),
    );
  };

  return (
    <div style={{ display: 'flex', marginLeft: '20px' }}>
      <IconButton size="small" onClick={handleClickUpdateCard}>
        <Edit />
      </IconButton>

      <UpdateCardForm
        isOpen={edit}
        closeHandler={() => {
          setEdit(false);
        }}
        createUpdateCard={updateCard}
        formTitle="edit"
        questionImg={questionImg}
        question={question}
        answer={answer}
      />
      {canUserChangingCard && <DeleteCardModal cardId={cardId} packId={packId} />}
    </div>
  );
});
