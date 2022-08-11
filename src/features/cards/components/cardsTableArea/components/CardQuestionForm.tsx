import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

import { useAppSelector } from 'app/store';
import { FormWrapper } from 'common/components/formWrapper/FormWrapper';
import { CardAnswerForm } from 'features/cards/components/cardsTableArea/components/CardAnswerForm';
import { BackspaceButton } from 'features/cards/components/common/backspaceIcon/BackspaceIcon';

export const CardQuestionForm = (): React.ReactElement => {
  const cards = useAppSelector(state => state.packCards.cards);
  const packs = useAppSelector(state => state.packs.cardPacks);
  const { cardId, packId } = useParams() as { cardId: string; packId: string };
  const currentCard = cards.find(c => c._id === cardId)!;
  const currentPack = packs.find(p => p._id === packId);
  const packName = currentPack ? currentPack.name : 'Pack Name';
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const onCLickAnswerHandler = (): void => {
    setShowAnswer(true);
  };
  return (
    <div>
      <BackspaceButton />
      <FormWrapper>
        <h2>{packName}</h2>
        <div>
          <b>Question: </b>
          <span>{currentCard.question}</span>
        </div>
        <div>
          <span>количество попыток ответов на вопрос: {currentCard!.shots}</span>
        </div>
        <Button variant="contained" onClick={onCLickAnswerHandler}>
          Show answer
        </Button>
        <div>
          {showAnswer && <CardAnswerForm cardId={cardId} answer={currentCard.answer} />}
        </div>
      </FormWrapper>
    </div>
  );
};
