import { setAppStatusAC } from 'app/app-reducer';
import { AppThunk } from 'app/store';
import {
  cardsAPI,
  CreateCardParamsType,
  GetCardsParamsType,
  GetCardsResponseType,
} from 'features/cards/cards-api';

const initialState: InitialStateType = {
  cards: [],
  cardsTotalCount: 12,
  maxGrade: 5,
  minGrade: 0,
  page: 1,
  pageCount: 4,
  packUserId: '',
};
type InitialStateType = GetCardsResponseType;

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'cards/SET-CARDS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
const setCardPacksAC = (payload: GetCardsResponseType) =>
  ({
    type: 'cards/SET-CARDS',
    payload,
  } as const);

export type CardsActionsType = ReturnType<typeof setCardPacksAC>;

export const setPackCardsTC =
  (params: GetCardsParamsType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));
    const response = await cardsAPI.getCards(params);
    dispatch(setCardPacksAC(response.data));
    dispatch(setAppStatusAC('succeeded'));
  };

export const createPackCardTC =
  (params: CreateCardParamsType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));
    // eslint-disable-next-line no-debugger
    debugger;
    await cardsAPI.createCard(params);
    dispatch(setPackCardsTC({ cardsPack_id: params.cardsPack_id }));
  };
