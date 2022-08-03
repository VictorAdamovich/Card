import React from 'react';

import { Delete, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

import { useAppSelector } from 'app/store';

type ActionsPropsType = {
  packId: string;
  userId: string;
};

export const Actions = (props: ActionsPropsType): React.ReactElement => {
  const { userId, packId } = props;

  const currentUserId = useAppSelector(state => state.login.userInfo.id);

  const canUserChangingPack = userId === currentUserId;

  return (
    <div>
      {packId}
      <IconButton>
        <Delete />
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
