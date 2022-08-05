import React from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/store';
import { TitleArea } from 'common/components/titleArea/TitleArea';
import { createPackCardTC } from 'features/cards/cards-reducer';
import { CardsSearchArea } from 'features/cards/components/cardsSearchArea/CardsSearchArea';
import { CardsTableArea } from 'features/cards/components/cardsTableArea/CardsTableArea';
import { EmptyPackPage } from 'features/cards/components/EmptyPackPage/EmptyPackPage';
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

  const handleAddNewCard = (value: string): void => {
    dispatch(createPackCardTC({ cardsPack_id: packId, question: value }));
  };

  return (
    <div className={styles.packsWrapper}>
      <TitleArea title={packName} buttonTitle="card" addNewName={handleAddNewCard} />
      <CardsSearchArea />
      {cards.length === empty ? (
        <EmptyPackPage addNewName={handleAddNewCard} />
      ) : (
        <CardsTableArea cards={cards} />
      )}
    </div>
  );
};
