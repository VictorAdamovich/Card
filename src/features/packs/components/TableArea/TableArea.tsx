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
import { Row } from 'features/packs/components/TableArea/components/Row';
import { CardPackType } from 'features/packs/packs-api';
import { setSortFlagAC } from 'features/packs/packs-reducer';

type TableAreaPropsType = {
  packs: CardPackType[];
};

export const TableArea = React.memo((props: TableAreaPropsType): React.ReactElement => {
  const { packs } = props;

  const dispatch = useAppDispatch();

  const sortFlag = useAppSelector(state => state.packs.sortFlag);

  const sort = (): void => {
    dispatch(setSortFlagAC());
    /* if (sortFlag) {
      // dispatch(fetchCardPacks({ sortPacks: SortPacksFlag.up }));
    } else {
      // dispatch(fetchCardPacks({ sortPacks: SortPacksFlag.down }));
    } */
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ bgcolor: '#EFEFEF' }}>
            <TableCell>Name</TableCell>
            <TableCell>Cards</TableCell>
            <TableCell>
              Last Updated{'  '}
              <IconButton
                onClick={sort}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                {sortFlag ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
              </IconButton>
            </TableCell>
            <TableCell>Created by</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packs.map(el => (
            <Row key={el._id} item={el} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
