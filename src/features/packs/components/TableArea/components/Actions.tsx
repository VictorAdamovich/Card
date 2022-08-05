import React from 'react';

import { Delete, Edit, School } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/store';
import { RoutePath } from 'common/enums/route-path';
import { setPackCardsTC } from 'features/cards/cards-reducer';

type ActionsPropsType = {
  packId: string;
  userId: string;
};

export const Actions = (props: ActionsPropsType): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId, packId } = props;

  const currentUserId = useAppSelector(state => state.login.userInfo._id);

  const canUserChangingPack = userId === currentUserId;
  const a = packId ? '' : '';

  const handleClickOpenPackCards = (): void => {
    dispatch(setPackCardsTC({ cardsPack_id: packId }));
    navigate(`${RoutePath.Packs}/${packId}/cards`);
  };

  return (
    <div>
      {a}
      <IconButton onClick={handleClickOpenPackCards}>
        <School />
      </IconButton>
      <IconButton>
        <Edit />
      </IconButton>
      {canUserChangingPack && (
        <IconButton>
          <Delete />
        </IconButton>
      )}
    </div>
  );
};
