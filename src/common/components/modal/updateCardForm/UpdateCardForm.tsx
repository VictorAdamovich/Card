import React, { ChangeEvent, useCallback } from 'react';

import { Box, FormControl, Select } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import useState from 'react-usestateref';

import { setAppSnackbarAC } from 'app/app-reducer';
import { useAppDispatch } from 'app/store';
import defaultQuestionImage from 'assets/images/defaultQuestionImage.jpg';
import { ModalWrapper } from 'common/components/modal/modalWrapper/modalWrapper';
import { convertFileToBase64 } from 'common/utils/convertFileToBase64';
import { CreateUpdateCardPayloadType } from 'features/cards/Cards';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  createUpdateCard: (payload: CreateUpdateCardPayloadType) => void;
  formTitle: string;
  isOpen: boolean;
  closeHandler: () => void;
  questionImg: string;
  question: string;
  answer: string;
};

export const UpdateCardForm = React.memo((props: PropsType): ReturnComponentType => {
  const {
    isOpen,
    closeHandler,
    createUpdateCard,
    formTitle,
    questionImg,
    question,
    answer,
  } = props;
  const [newAnswer, setNewAnswer] = useState<string>(answer);
  const [newQuestion, setNewQuestion] = useState<string>(question);
  const [newQuestionImg, setNewQuestionImg, imgRef] = useState<string>(
    questionImg || defaultQuestionImage,
  );
  const [questionFormat, setQuestionFormat] = useState<string>(
    questionImg && questionImg !== 'brokenAva' ? 'picture' : 'text',
  );
  const [isAvaBroken, setIsAvaBroken] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback((): void => {
    closeHandler();
  }, []);

  const handleUpdateCard = (): void => {
    if (!showImage) {
      setNewQuestionImg('brokenAva');
    }
    createUpdateCard({
      answer: newAnswer,
      question: newQuestion,
      questionImg: imgRef.current,
    });
    closeHandler();
  };
  const handleChange = (event: SelectChangeEvent): void => {
    setQuestionFormat(event.target.value);
  };
  const onChangeTextHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setNewQuestion(e.currentTarget.value);
    setShowImage(false);
  };

  const zeroIndex = 0;
  const maxSizeOfImage = 4000000;
  const uploadHandler = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[zeroIndex];

      if (file.size < maxSizeOfImage) {
        convertFileToBase64(file, (file64: string) => {
          setIsAvaBroken(false);
          setNewQuestionImg(file64);
          setShowImage(true);
        });
      } else {
        dispatch(setAppSnackbarAC('error', 'Image is too big'));
      }
    }
  }, []);
  const errorHandler = useCallback((): void => {
    setIsAvaBroken(true);
  }, []);

  return (
    <ModalWrapper open={isOpen} handleClose={handleCloseModal}>
      <DialogTitle>{formTitle} card</DialogTitle>
      <Box color="gray" marginLeft="10px">
        Choose a question format
      </Box>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          value={questionFormat}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="picture">Picture</MenuItem>
          <MenuItem value="text">Text</MenuItem>
        </Select>
      </FormControl>
      <DialogContent>
        <DialogContentText>
          For {formTitle}ing card you should {formTitle} question and answer of the card.
        </DialogContentText>
        {questionFormat === 'text' ? (
          <TextField
            autoFocus
            margin="dense"
            value={newQuestion}
            id="cardQuestion"
            label="Card question"
            type="text"
            onChange={onChangeTextHandler}
            fullWidth
            variant="standard"
          />
        ) : (
          <label
            htmlFor="cardQuestionIMG"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <img
              style={{ maxWidth: '250px' }}
              onError={errorHandler}
              alt="questionImage"
              src={isAvaBroken ? defaultQuestionImage : newQuestionImg}
            />
            <input
              id="cardQuestionIMG"
              type="file"
              onChange={uploadHandler}
              style={{ display: 'none' }}
              accept="image/*"
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
        )}
        <TextField
          margin="dense"
          id="cardAnsw"
          label="Card answer"
          value={newAnswer}
          type="text"
          onChange={e => setNewAnswer(e.currentTarget.value)}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button
          onClick={handleUpdateCard}
          disabled={!newAnswer || (!newQuestion && !newQuestionImg)}
        >
          {formTitle} card
        </Button>
      </DialogActions>
    </ModalWrapper>
  );
});
