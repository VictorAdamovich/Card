import React from 'react';

import { Delete, Edit, School } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch, useAppSelector } from 'app/store';
import { deletePack } from 'features/packs/packs-reducer';

type ActionsPropsType = {
  packId: string;
  userId: string;
};

export const Actions = (props: ActionsPropsType): React.ReactElement => {
  const { userId, packId } = props;

  const dispatch = useAppDispatch();

  const currentUserId = useAppSelector(state => state.login.userInfo._id);

  const canUserChangingPack = userId === currentUserId;

  return (
    <div>
      <IconButton>
        <School />
      </IconButton>
      {canUserChangingPack && (
        <IconButton>
          <Edit />
        </IconButton>
      )}
      {canUserChangingPack && (
        <IconButton onClick={() => dispatch(deletePack(packId))}>
          <Delete />
        </IconButton>
      )}
    </div>
  );
};
