import React from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

import styles from './Row.module.css';

import { RoutePath } from 'common/enums/route-path';
import { Actions } from 'features/packs/components/TableArea/components/Actions';
import { CardPackType } from 'features/packs/packs-api';

type RowPropsType = {
  item: CardPackType;
};

export const Row = React.memo((props: RowPropsType) => {
  const { item } = props;
  const navigate = useNavigate();
  const { _id, name, cardsCount, updated } = item;

  const startSlice = 0;
  const endSlice = 20;

  const onClickQuestionCardHandler = (): void => {
    navigate(`${RoutePath.Packs}/${_id}/cards`);
  };
  return (
    <TableRow key={_id}>
      <TableCell onClick={onClickQuestionCardHandler} className={styles.name}>
        <p>{name}</p>
      </TableCell>
      <TableCell>{cardsCount}</TableCell>
      <TableCell>{updated.split('T').join('  ').slice(startSlice, endSlice)}</TableCell>
      <TableCell>{item.user_name}</TableCell>
      <TableCell>
        <Actions userId={item.user_id} packId={_id} packName={name} />
      </TableCell>
    </TableRow>
  );
});
