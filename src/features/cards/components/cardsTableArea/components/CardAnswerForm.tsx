import React, { useState } from 'react';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import Button from '@mui/material/Button';

import { useAppDispatch } from 'app/store';
import { updateCardGradeTC } from 'features/cards/cards-reducer';

type PropsType = {
  answer: string;
  cardId: string;
};

export const CardAnswerForm = ({ answer, cardId }: PropsType): React.ReactElement => {
  const dispatch = useAppDispatch();
  const startValue = 0;
  const [value, setValue] = useState<number>(startValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const currentGrade = +(event.target as HTMLInputElement).value;
    dispatch(updateCardGradeTC(currentGrade, cardId));
    setValue(+(event.target as HTMLInputElement).value);
  };
  const onCLickUpdateGradeHandler = (): void => {
    dispatch(updateCardGradeTC(value, cardId));
    console.log(value);
  };
  return (
    <div>
      <div>
        <b>Answer: </b>
        <span>{answer}</span>
      </div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Rate yourself</FormLabel>
        <RadioGroup
          aria-labelledby="controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value={1} control={<Radio />} label="Did not know" />
          <FormControlLabel value={2} control={<Radio />} label="Forgot" />
          <FormControlLabel value={3} control={<Radio />} label="A lot of thought" />
          <FormControlLabel value={4} control={<Radio />} label="Confused" />
          <FormControlLabel value={5} control={<Radio />} label="Knew the answer" />
        </RadioGroup>
        <Button variant="contained" onClick={onCLickUpdateGradeHandler}>
          Next
        </Button>
      </FormControl>
    </div>
  );
};
