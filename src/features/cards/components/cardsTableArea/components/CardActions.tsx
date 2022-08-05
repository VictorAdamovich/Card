import React from 'react';

import { Delete, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

type ActionsPropsType = {
  packId: string;
};

export const CardActions = (props: ActionsPropsType): React.ReactElement => {
  const { packId } = props;

  const a = packId ? '' : '';

  return (
    <div>
      {a}
      <IconButton>
        <Edit />
      </IconButton>
      <IconButton>
        <Delete />
      </IconButton>
    </div>
  );
};
