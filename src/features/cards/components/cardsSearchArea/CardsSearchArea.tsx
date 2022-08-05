import React from 'react';

import TextField from '@mui/material/TextField';

import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const CardsSearchArea = React.memo((): ReturnComponentType => {
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    console.log(e.currentTarget.value);
  };

  return (
    <div className={styles.filterAreaBlock}>
      <div>Search</div>
      <TextField
        size="small"
        value="find"
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
