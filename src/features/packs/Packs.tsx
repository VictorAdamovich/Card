import React, { useCallback } from 'react';

// import { useAppDispatch } from 'app/store';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';

import { AddNewPackName } from 'common/components/modal/AddNewPackName';
import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Packs = (): ReturnComponentType => {
  // const dispatch = useAppDispatch();

  const handleAddNewPack = useCallback((value: string): void => {
    //  dispatch Thunk for addNewPack
    // dispatch({ type: 'adasd' });
    console.log(value);
  }, []);
  return (
    <div className={styles.packsWrapper}>
      <div className={styles.titleArea}>
        <div>Packs list</div>
        <AddNewPackName addNewPackName={handleAddNewPack} />
      </div>

      <div className={styles.filterArea}>
        <div className={styles.filterAreaBlock}>
          <div>Search</div>
          <TextField
            size="small"
            sx={{ width: '463px', marginTop: '8px' }}
            style={{ padding: '0' }}
            id="outlined-search"
            placeholder="Search field"
            type="search"
          />
        </div>
        <div className={styles.filterAreaBlock}>
          <div>Show packs cards</div>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button sx={{ width: '98px', height: '39,98px', marginTop: '8px' }}>
              My
            </Button>
            <Button sx={{ width: '98px', height: '39,98px', marginTop: '8px' }}>
              All
            </Button>
          </ButtonGroup>
        </div>
        <div className={styles.filterAreaBlock}>
          <div>Number of cards</div>
          <div>Number of cards</div>
        </div>
      </div>
      <div>table area</div>
      <div>pagination</div>
    </div>
  );
};
