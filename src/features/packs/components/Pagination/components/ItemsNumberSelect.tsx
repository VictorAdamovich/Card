import React from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type ItemsNumberSelectProps = {
  pageCount: number;
  changePageCount: (value: number) => void;
};

export const ItemsNumberSelect = React.memo((props: ItemsNumberSelectProps) => {
  const { pageCount, changePageCount } = props;

  return (
    <Select
      value={pageCount.toString()}
      size="small"
      defaultValue="6"
      onChange={(e: SelectChangeEvent) => {
        changePageCount(+e.target.value);
      }}
    >
      <MenuItem value={3}>4</MenuItem>
      <MenuItem value={6}>6</MenuItem>
      <MenuItem value={9}>8</MenuItem>
      <MenuItem value={9}>10</MenuItem>
      <MenuItem value={9}>12</MenuItem>
      <MenuItem value={9}>20</MenuItem>
    </Select>
  );
});
