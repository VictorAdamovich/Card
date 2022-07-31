import React, { useCallback, useEffect } from 'react';

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
import { TitleArea } from 'common/components/titleArea/TitleArea';
import { SortPacksFlag } from 'common/enums/sort-packs-flag';
import { MyAllPacksArea } from 'features/packs/components/MyAllPacksArea';
import { NumberOfCardsFilterArea } from 'features/packs/components/NumberOfCardsFilterArea';
import { SearchArea } from 'features/packs/components/SearchArea';
import {
  createNewPack,
  fetchCardPacks,
  setSortFlagAC,
} from 'features/packs/packs-reducer';
import styles from 'features/packs/Packs.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Packs = React.memo((): ReturnComponentType => {
  const packs = useAppSelector(state => state.packs.cardPacks);
  const statePacks = useAppSelector(state => state.packs);
  const sortFlag = useAppSelector(state => state.packs.sortFlag);
  // const st = useAppSelector(state => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCardPacks({}));
  }, []);

  const handleAddNewPack = useCallback((value: string): void => {
    dispatch(createNewPack(value));
  }, []);

  const sort = (): void => {
    dispatch(setSortFlagAC());
    if (sortFlag) {
      dispatch(fetchCardPacks({ sortPacks: SortPacksFlag.up }));
    } else {
      dispatch(fetchCardPacks({ sortPacks: SortPacksFlag.down }));
    }
  };
  /* const hand2 = (): void => {
    dispatch(fetchCardPacks({ sortPacks: SortPacksFlag.down }));
  }; */
  return (
    <div className={styles.packsWrapper}>
      <TitleArea title="Packs list" buttonTitle="pack" addNewName={handleAddNewPack} />

      <div className={styles.filterArea}>
        <SearchArea />

        <MyAllPacksArea />

        <NumberOfCardsFilterArea />
      </div>
      {/* <div>
        <div>{statePacks.minCardsCount}</div>
        <div>{statePacks.maxCardsCount}</div>
        <div>{statePacks.cardPacksTotalCount}</div>
        <div>{statePacks.min}</div>
        <div>{statePacks.max}</div>
        table area
        <div>
          {packs.map(el => (
            // eslint-disable-next-line no-underscore-dangle
            <div key={el._id}>{el.name}</div>
          ))}
        </div>
      </div> */}
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
              <TableRow key={el._id}>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.cardsCount}</TableCell>
                {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
                <TableCell>{el.updated.split('T').join('  ').slice(0, 20)}</TableCell>
                <TableCell>{el.user_name}</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>{statePacks.cardPacksTotalCount}</div>
      <div>pagination</div>
    </div>
  );
});
