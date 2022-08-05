import React from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/store';
import { createPackCardTC } from 'features/cards/cards-reducer';
import { CardsSearchArea } from 'features/cards/components/cardsSearchArea/CardsSearchArea';
import { CardsTableArea } from 'features/cards/components/cardsTableArea/CardsTableArea';
import { CardsTitleArea } from 'features/cards/components/cardsTitleArea/CardsTitleArea';
import { EmptyPackPage } from 'features/cards/components/emptyPackPage/EmptyPackPage';
import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Cards = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(state => state.packCards.cards);
  const packs = useAppSelector(state => state.packs.cardPacks);
  const { packId } = useParams<'packId'>() as { packId: string };
  const empty = 0;
  const currentPack = packs.find(p => p._id === packId);
  const packName = currentPack ? currentPack.name : 'Pack Name';

  const handleAddNewCard = (question: string, answer: string): void => {
    dispatch(createPackCardTC({ cardsPack_id: packId, question, answer }));
  };

  return (
    <div className={styles.packsWrapper}>
      <CardsTitleArea title={packName} addNewCard={handleAddNewCard} />
      <CardsSearchArea />
      {cards.length === empty ? (
        <EmptyPackPage addNewCard={handleAddNewCard} />
      ) : (
        <CardsTableArea cards={cards} />
      )}
    </div>
  );
};
