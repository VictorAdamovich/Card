import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { useAppDispatch, useAppSelector } from 'app/store';
import useDebounce from 'common/hooks/useDebounce';
import { fetchCardPacks, setMinMaxFilterValueAC } from 'features/packs/packs-reducer';
import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const NumberOfCardsFilterArea = React.memo((): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
  const min = useAppSelector(state => state.packs.min);
  const max = useAppSelector(state => state.packs.max);

  const delay = 3000;
  const debouncedValue = useDebounce<number>(min, delay);
  const debouncedValue2 = useDebounce<number>(max, delay);

  const initMin = 0;
  const initMax = 1000;

  useEffect(() => {
    if (min === debouncedValue && min !== initMin) {
      dispatch(fetchCardPacks({ min }));
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (max === debouncedValue2 && max !== initMax) {
      dispatch(fetchCardPacks({ max }));
    }
  }, [debouncedValue2]);

  const index0 = 0;
  const index1 = 1;

  const handleChange = (event: Event, value: number | number[]): void => {
    if (Array.isArray(value)) {
      dispatch(setMinMaxFilterValueAC(value[index0], value[index1]));
    }
  };
  return (
    <div className={styles.filterAreaBlock}>
      <div>Number of cards</div>
      <Box sx={{ width: 250 }}>
        <Slider
          getAriaLabel={() => 'Packs count range'}
          value={[min, max]}
          min={minCardsCount}
          max={maxCardsCount}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </Box>
    </div>
  );
});
