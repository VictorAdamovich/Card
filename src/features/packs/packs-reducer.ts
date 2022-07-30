import { setAppSnackbarAC, setAppStatusAC } from 'app/app-reducer';
import { AppThunk } from 'app/store';
import { handleServerNetworkError } from 'common/utils/error-utils';
import {
  FetchPacksParamsType,
  FetchPacksResponseType,
  packsAPI,
} from 'features/packs/packs-api';

const initialState = {
  cardPacks: [],
  page: 1,
  pageCount: 4,
  cardPacksTotalCount: 1,
  minCardsCount: 0,
  maxCardsCount: 0,
  paramsForFetchPacks: {},
};
type InitialStateType = FetchPacksResponseType & {
  paramsForFetchPacks: FetchPacksParamsType;
};

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionType,
): InitialStateType => {
  switch (action.type) {
    case 'packs/SET-CARD-PACKS':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// __________________Actions_____________________

const setCardPacksAC = (payload: FetchPacksResponseType) =>
  ({
    type: 'packs/SET-CARD-PACKS',
    payload,
  } as const);
// ___________________Thunks_____________________

export const fetchCardPacks = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC('loading'));
  packsAPI
    .fetchPacks({})
    .then(res => {
      const {
        cardPacks,
        page,
        pageCount,
        cardPacksTotalCount,
        minCardsCount,
        maxCardsCount,
      } = res.data; // забираю через деструктурирование только то что мне надо для стейта

      dispatch(
        setCardPacksAC({
          cardPacks,
          page,
          pageCount,
          cardPacksTotalCount,
          minCardsCount,
          maxCardsCount,
        }),
      );
      dispatch(setAppStatusAC('succeeded'));
      dispatch(setAppSnackbarAC('success', res.statusText));
    })
    .catch(err => {
      handleServerNetworkError(err.message, dispatch);
    })
    .finally(() => {
      dispatch(setAppStatusAC('idle'));
    });
};

// __________________Types_______________________

export type PacksActionType = SetCardPacksAT;
type SetCardPacksAT = ReturnType<typeof setCardPacksAC>;
