import React from 'react';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { AddNewPackName } from 'common/components/modal/AddNewPackName';

type PropsType = {
  addNewName: (value: string) => void;
};
export const EmptyPackPage = (props: PropsType): React.ReactElement => {
  const { addNewName } = props;
  return (
    <Box>
      <Typography>This page is empty. Click to add new card to fill this pack</Typography>
      <AddNewPackName buttonTitle="card" addNewPackName={addNewName} />
    </Box>
  );
};
