import React from 'react';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { AddCardForm } from 'features/cards/components/common/addCardForm/AddCardForm';

type PropsType = {
  addNewCard: (question: string, answer: string) => void;
};
export const EmptyPackPage = ({ addNewCard }: PropsType): React.ReactElement => (
  <Box
    style={{
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <Typography style={{ margin: '30px' }}>
      This page is empty. Click to add new card to fill this pack
    </Typography>
    <AddCardForm addNewCard={addNewCard} />
  </Box>
);
