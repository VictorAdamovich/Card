import React, { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/store';
import { TitleArea } from 'common/components/titleArea/TitleArea';
import { MyAllPacksArea } from 'features/packs/components/MyAllPacksArea';
import { NumberOfCardsFilterArea } from 'features/packs/components/NumberOfCardsFilterArea';
import { SearchArea } from 'features/packs/components/SearchArea';
import { createNewPack, fetchCardPacks } from 'features/packs/packs-reducer';
import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Packs = React.memo((): ReturnComponentType => {
  const packs = useAppSelector(state => state.packs.cardPacks);
  // const statePacks = useAppSelector(state => state.packs);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCardPacks({}));
  }, []);

  const handleAddNewPack = useCallback((value: string): void => {
    dispatch(createNewPack(value));
  }, []);
  return (
    <div className={styles.packsWrapper}>
      <TitleArea title="Packs list" buttonTitle="pack" addNewName={handleAddNewPack} />

      <div className={styles.filterArea}>
        <SearchArea />

        <MyAllPacksArea />

        <NumberOfCardsFilterArea />
      </div>
      <div>
        {/* <div>{statePacks.minCardsCount}</div>
        <div>{statePacks.maxCardsCount}</div>
        <div>{statePacks.cardPacksTotalCount}</div>
        <div>{statePacks.min}</div>
        <div>{statePacks.max}</div> */}
        table area
        <div>
          {packs.map(el => (
            // eslint-disable-next-line no-underscore-dangle
            <div key={el._id}>{el.name}</div>
          ))}
        </div>
      </div>
      <div>pagination</div>
    </div>
  );
});
