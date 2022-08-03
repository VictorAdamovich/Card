import React from 'react';

import { Delete, Edit, School } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

import { useAppSelector } from 'app/store';

type ActionsPropsType = {
  packId: string;
  userId: string;
};

export const Actions = (props: ActionsPropsType): React.ReactElement => {
  const { userId, packId } = props;

  const currentUserId = useAppSelector(state => state.login.userInfo._id);

  const canUserChangingPack = userId === currentUserId;
  const a = packId ? '' : '';

  return (
    <div>
      {a}
      <IconButton>
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
