import React from 'react';

import { Box, Rating } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'app/store';
import { RoutePath } from 'common/enums/route-path';
import { CardsType } from 'features/cards/cards-api';
import { CardActions } from 'features/cards/components/cardsTableArea/components/CardActions';

type RowPropsType = {
  item: CardsType;
};

export const CardRow = React.memo((props: RowPropsType) => {
  const { item } = props;
  // eslint-disable-next-line camelcase
  const { _id, question, answer, updated, grade, cardsPack_id } = item;

  const navigate = useNavigate();

  const startSlice = 0;
  const endSlice = 20;

  const currentUserId = useAppSelector(state => state.login.userInfo._id);
  const canUserChangingCard = item.user_id === currentUserId;

  const onClickQuestionCardHandler = (): void => {
    // eslint-disable-next-line camelcase
    navigate(`${RoutePath.Packs}/${cardsPack_id}/cards/${_id}`);
  };

  return (
    <TableRow key={_id}>
      <TableCell onDoubleClick={onClickQuestionCardHandler}>{question}</TableCell>
      <TableCell>{answer}</TableCell>
      <TableCell>{updated.split('T').join('  ').slice(startSlice, endSlice)}</TableCell>
      <TableCell>
        <Box style={{ display: 'flex' }}>
          <Rating
            style={{ alignItems: 'center' }}
            name="read-only"
            value={grade}
            readOnly
          />
          {/* eslint-disable-next-line camelcase */}
          {canUserChangingCard && <CardActions packId={cardsPack_id} cardId={_id} />}
        </Box>
      </TableCell>
    </TableRow>
  );
});
