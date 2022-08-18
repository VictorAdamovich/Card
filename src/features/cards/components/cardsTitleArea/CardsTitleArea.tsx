import React from 'react';

import { useAppSelector } from 'app/store';
import { BackspaceButton } from 'common/components/backspaceIcon/BackspaceIcon';
import { AddCardForm } from 'common/components/modal/addCardForm/AddCardForm';
import styles from 'common/components/titleArea/TitleArea.module.css';
import { CreateUpdateCardPayloadType } from 'features/cards/Cards';
import { ReturnComponentType } from 'types/ReturnComponentType';

type TitleAreaPropsType = {
  title: string;
  addNewCard: (payload: CreateUpdateCardPayloadType) => void;
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
