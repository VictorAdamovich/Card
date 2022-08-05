import React from 'react';

import { Rating } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useAppSelector } from 'app/store';
import { CardsType } from 'features/cards/cards-api';
import { CardActions } from 'features/cards/components/cardsTableArea/components/CardActions';

type RowPropsType = {
  item: CardsType;
};

export const CardRow = React.memo((props: RowPropsType) => {
  const { item } = props;

  const { _id, question, answer, updated, grade } = item;

  const startSlice = 0;
  const endSlice = 20;

  const currentUserId = useAppSelector(state => state.login.userInfo._id);

  const canUserChangingPack = item.user_id === currentUserId;

  return (
    <TableRow key={_id}>
      <TableCell>{question}</TableCell>
      <TableCell>{answer}</TableCell>
      <TableCell>{updated.split('T').join('  ').slice(startSlice, endSlice)}</TableCell>
      <TableCell>
        <Rating name="read-only" value={grade} readOnly />
        {canUserChangingPack && <CardActions packId={_id} />}
      </TableCell>
    </TableRow>
  );
});
