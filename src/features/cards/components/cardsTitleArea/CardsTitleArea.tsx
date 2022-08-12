import React from 'react';

import { useAppSelector } from 'app/store';
import { BackspaceButton } from 'common/components/backspaceIcon/BackspaceIcon';
import styles from 'common/components/titleArea/TitleArea.module.css';
import { AddCardForm } from 'features/cards/components/common/addCardForm/AddCardForm';
import { ReturnComponentType } from 'types/ReturnComponentType';

type TitleAreaPropsType = {
  title: string;
  addNewCard: (question: string, answer: string) => void;
};

export const CardsTitleArea = React.memo(
  ({ title, addNewCard }: TitleAreaPropsType): ReturnComponentType => {
    const cards = useAppSelector(state => state.packCards.cards);

    return (
      <div>
        <BackspaceButton />
        <div className={styles.titleArea}>
          <div>{title}</div>
          {cards.length ? <AddCardForm addNewCard={addNewCard} /> : ''}
        </div>
      </div>
    );
  },
);
