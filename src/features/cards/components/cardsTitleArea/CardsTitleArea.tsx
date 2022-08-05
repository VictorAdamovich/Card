import React from 'react';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'app/store';
import styles from 'common/components/titleArea/TitleArea.module.css';
import { AddCardForm } from 'features/cards/components/common/addCardForm/AddCardForm';
import { ReturnComponentType } from 'types/ReturnComponentType';

type TitleAreaPropsType = {
  title: string;
  addNewCard: (question: string, answer: string) => void;
};

export const CardsTitleArea = React.memo(
  ({ title, addNewCard }: TitleAreaPropsType): ReturnComponentType => {
    const cards = useAppSelector(state => state.packCards.cards);
    const navigate = useNavigate();
    const prevPage = -1;

    const onClickHandler = (): void => {
      navigate(prevPage);
    };
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={onClickHandler}>
            <KeyboardBackspaceIcon />
          </Button>
          <Typography>Back to Packs List</Typography>
        </div>
        <div className={styles.titleArea}>
          <div>{title}</div>
          {cards.length ? <AddCardForm addNewCard={addNewCard} /> : ''}
        </div>
      </div>
    );
  },
);
