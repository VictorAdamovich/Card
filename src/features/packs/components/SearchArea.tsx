import React, { useEffect } from 'react';

import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from 'app/store';
import useDebounce from 'common/hooks/useDebounce';
import {
  fetchCardPacks,
  setSearchValueAC /* setSearchValueAC */,
} from 'features/packs/packs-reducer';
import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const SearchArea = React.memo((): ReturnComponentType => {
  const searchValue = useAppSelector(state => state.packs.searchValue);

  const dispatch = useAppDispatch();

  const delay = 1000;
  const debouncedValue = useDebounce<string | undefined>(searchValue, delay);

  useEffect(() => {
    if (searchValue !== '') {
      dispatch(fetchCardPacks({ packName: debouncedValue }));
    }
  }, [debouncedValue]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    dispatch(setSearchValueAC(e.currentTarget.value));
  };

  return (
    <div className={styles.filterAreaBlock}>
      <div>Search</div>
      <TextField
        size="small"
        value={searchValue}
        onChange={handleOnChange}
        sx={{ width: '463px', marginTop: '8px' }}
        style={{ padding: '0' }}
        id="outlined-search"
        placeholder="Search field"
        type="search"
      />
    </div>
  );
});
