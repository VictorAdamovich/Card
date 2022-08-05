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
  sortFlag: false,
};
type InitialStateType = GetCardsResponseType & { sortFlag: boolean };

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'cards/SET-CARDS':
      return { ...state, ...action.payload };
    case 'cards/SET-SORT-FLAG':
      return {
        ...state,
        sortFlag: !state.sortFlag,
      };
    default:
      return state;
  }
};
const setCardPacksAC = (payload: GetCardsResponseType) =>
  ({
    type: 'cards/SET-CARDS',
    payload,
  } as const);

export const setCardsSortFlagAC = () =>
  ({
    type: 'cards/SET-SORT-FLAG',
  } as const);

export type CardsActionsType =
  | ReturnType<typeof setCardPacksAC>
  | ReturnType<typeof setCardsSortFlagAC>;

// ____________________Thunks_______________________
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
    await cardsAPI.createCard(params);
    dispatch(setPackCardsTC({ cardsPack_id: params.cardsPack_id }));
  };
export const deletePackCardTC =
  (packId: string, cardId: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));
    await cardsAPI.deleteCard(cardId);
    dispatch(setPackCardsTC({ cardsPack_id: packId }));
  };
export const updatePackCardTC =
  (packId: string, cardId: string, question?: string, answer?: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));
    await cardsAPI.updateCard({ cardId, question, answer });
    dispatch(setPackCardsTC({ cardsPack_id: packId }));
  };
