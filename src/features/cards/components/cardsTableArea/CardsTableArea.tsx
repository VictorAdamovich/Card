import React from 'react';

import { ArrowDropDownOutlined, ArrowDropUpOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useAppDispatch, useAppSelector } from 'app/store';
import { CardsType } from 'features/cards/cards-api';
import { setCardsSortFlagAC } from 'features/cards/cards-reducer';
import { CardRow } from 'features/cards/components/cardsTableArea/components/CardRow';

type CardsTableAreaPropsType = {
  cards: CardsType[];
};

export const CardsTableArea = React.memo(
  ({ cards }: CardsTableAreaPropsType): React.ReactElement => {
    const dispatch = useAppDispatch();
    const sortFlag = useAppSelector(state => state.packCards.sortFlag);

    const sort = (): void => {
      dispatch(setCardsSortFlagAC());
    };

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ bgcolor: '#EFEFEF' }}>
              <TableCell style={{ minWidth: 235 }}>Question</TableCell>
              <TableCell style={{ minWidth: 235 }}>Answer</TableCell>
              <TableCell style={{ minWidth: 130 }}>
                Last Updated{'  '}
                <IconButton onClick={sort} color="primary">
                  {sortFlag ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                </IconButton>
              </TableCell>
              <TableCell style={{ minWidth: 100 }}>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map(el => (
              <CardRow key={el._id} item={el} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  },
);
