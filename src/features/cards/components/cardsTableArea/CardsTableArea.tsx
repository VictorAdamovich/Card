import React from 'react';

import { ArrowDropDownOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { CardsType } from 'features/cards/cards-api';
import { CardRow } from 'features/cards/components/cardsTableArea/components/CardRow';

type CardsTableAreaPropsType = {
  cards: CardsType[];
};

export const CardsTableArea = React.memo(
  (props: CardsTableAreaPropsType): React.ReactElement => {
    const { cards } = props;
    //
    // const dispatch = useAppDispatch();
    //
    // const sortFlag = useAppSelector(state => state.packs.sortFlag);

    // const sort = (): void => {
    //   dispatch(setSortFlagAC());
    /* if (sortFlag) {
            // dispatch(fetchCardPacks({ sortPacks: SortPacksFlag.up }));
          } else {
            // dispatch(fetchCardPacks({ sortPacks: SortPacksFlag.down }));
          } */
    // };
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ bgcolor: '#EFEFEF' }}>
              <TableCell>Question</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>
                Last Updated{'  '}
                <IconButton
                  // onClick={sort}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  {/* {sortFlag ? <ArrowDropUpOutlined /> */}
                  <ArrowDropDownOutlined />
                </IconButton>
              </TableCell>
              <TableCell>Grade</TableCell>
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
