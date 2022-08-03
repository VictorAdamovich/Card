import React, { useCallback, useEffect } from 'react';

import { Pagination } from './components/Pagination/Pagination';

import { useAppDispatch, useAppSelector } from 'app/store';
import { TitleArea } from 'common/components/titleArea/TitleArea';
import { FilterArea } from 'features/packs/components/FilterArea/FilterArea';
import { TableArea } from 'features/packs/components/TableArea/TableArea';
import {
  createNewPack,
  fetchCardPacks,
  setPageCountNumber,
  setPageNumber,
} from 'features/packs/packs-reducer';
import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Packs = React.memo((): ReturnComponentType => {
  // const packs = useAppSelector(state => state.packs.cardPacks);
  const page = useAppSelector(state => state.packs.page);
  const pageCount = useAppSelector(state => state.packs.pageCount);
  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount);

  const dispatch = useAppDispatch();

  // первый запрос на получение колод
  useEffect(() => {
    dispatch(fetchCardPacks({}));
  }, []);

  // запрос по страницам с колодами, выполняется при взаимодействии с пагинацией
  useEffect(() => {
    dispatch(fetchCardPacks({ page, pageCount }));
  }, [page, pageCount]);

  // ________________________колбэк для добавления колоды_____________________
  const handleAddNewPack = useCallback((value: string): void => {
    dispatch(createNewPack(value));
  }, []);

  // _______________________ колбэки для пагинации ____________________
  const changePageCount = useCallback((value: number): void => {
    //  dispatch Action forChanging pageCount value
    dispatch(setPageCountNumber(value));
  }, []);

  const changePage = useCallback((value: number): void => {
    //  dispatch Action for Changing page number
    dispatch(setPageNumber(value));
  }, []);
  // ____________________________________________________________________
  return (
    <div className={styles.packsWrapper}>
      <TitleArea title="Packs list" buttonTitle="pack" addNewName={handleAddNewPack} />
      <FilterArea />
      {/* packs={packs} */}
      <TableArea />
      <Pagination
        page={page}
        pageCount={pageCount}
        totalCount={totalCount}
        changePageCount={changePageCount}
        changePage={changePage}
      />
    </div>
  );
});
