import React, { ReactElement } from 'react';

import { ArrowDropDownOutlined, ArrowDropUpOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useAppDispatch, useAppSelector } from 'app/store';
import { setSortChoiceAC, setSortFlagAC } from 'features/packs/packs-reducer';

export const HeaderRow = (): ReactElement => {
  const dispatch = useAppDispatch();

  const sortFlag = useAppSelector(state => state.packs.sortFlag);
  const sortChoice = useAppSelector(state => state.packs.sortChoice);

  const sortChoiceHandler = (sortChoicer: 'updated' | 'name' | 'cardsCount'): void => {
    dispatch(setSortChoiceAC(sortChoicer));
  };
  const sort = (): void => {
    dispatch(setSortFlagAC());
  };
  return (
    <TableRow sx={{ bgcolor: '#EFEFEF' }}>
      <TableCell onClick={() => sortChoiceHandler('name')}>
        Name{'  '}
        {sortChoice === 'name' && (
          <IconButton
            onClick={sort}
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            {sortFlag ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
          </IconButton>
        )}
      </TableCell>
      <TableCell onClick={() => sortChoiceHandler('cardsCount')}>
        Cards{'  '}
        {sortChoice === 'cardsCount' && (
          <IconButton
            onClick={sort}
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            {sortFlag ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
          </IconButton>
        )}
      </TableCell>
      <TableCell onClick={() => sortChoiceHandler('updated')}>
        Last Updated{'  '}
        {sortChoice === 'updated' && (
          <IconButton
            onClick={sort}
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            {sortFlag ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
          </IconButton>
        )}
      </TableCell>
      <TableCell>Created by</TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
  );
};
