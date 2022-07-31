import { setAppSnackbarAC, setAppStatusAC } from 'app/app-reducer';
import { AppThunk } from 'app/store';
// import { SortPacksFlag } from 'common/enums/sort-packs-flag';
import { handleServerNetworkError } from 'common/utils/error-utils';
import {
  FetchPacksParamsType,
  FetchPacksResponseType,
  packsAPI,
} from 'features/packs/packs-api';

const initialState: InitialStateType = {
  cardPacks: [],
  page: 1,
  pageCount: 4,
  cardPacksTotalCount: 1,
  minCardsCount: 0,
  maxCardsCount: 1000,
  min: 0,
  max: 1000,
  paramsForFetchPacks: {},
  isOnlyMyPacks: false,
  searchValue: '',
};
type InitialStateType = FetchPacksResponseType & {
  paramsForFetchPacks: FetchPacksParamsType;
  isOnlyMyPacks: boolean;
  searchValue: string;
  min: number;
  max: number;
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
    case 'packs/SET-IS-ONLY-MY-PACKS':
      return {
        ...state,
        isOnlyMyPacks: action.flag,
      };
    case 'packs/SET-SEARCH-VALUE':
    case 'packs/SET-MIN-MAX-FILTER-VALUES':
    case 'packs/SET-MIN-MAX-CARDS-COUNTS-VALUES':
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

export const setSearchValueAC = (value: string) =>
  ({
    type: 'packs/SET-SEARCH-VALUE',
    payload: {
      searchValue: value,
    },
  } as const);
export const setIsOnlyMyPacksAC = (flag: boolean) =>
  ({
    type: 'packs/SET-IS-ONLY-MY-PACKS',
    flag,
  } as const);

export const setMinMaxCardsCountAC = (minCardsCount: number, maxCardsCount: number) =>
  ({
    type: 'packs/SET-MIN-MAX-CARDS-COUNTS-VALUES',
    payload: {
      minCardsCount,
      maxCardsCount,
    },
  } as const);

export const setMinMaxFilterValueAC = (min: number, max: number) =>
  ({
    type: 'packs/SET-MIN-MAX-FILTER-VALUES',
    payload: {
      min,
      max,
    },
  } as const);
// ___________________Thunks_____________________

export const fetchCardPacks =
  (params: FetchPacksParamsType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'));
    packsAPI
      .fetchPacks(params)
      .then(res => {
        dispatch(setCardPacksAC(res.data));
        dispatch(setAppStatusAC('succeeded'));
        dispatch(setAppSnackbarAC('success', res.statusText)); // check what is status text
      })
      .catch(err => {
        handleServerNetworkError(err.message, dispatch);
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'));
      });
  };

export const createNewPack =
  (packName: string /* deckCover?: string */): AppThunk =>
  (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    packsAPI
      .createPack(packName)
      .then(res => {
        const params = getState().packs.paramsForFetchPacks;
        dispatch(setAppSnackbarAC('success', res.statusText)); // check what is status text
        dispatch(fetchCardPacks(params));
      })
      .catch(err => {
        handleServerNetworkError(err.message, dispatch);
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'));
      });
  };
export const deletePack =
  (packId: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    packsAPI
      .deletePack(packId)
      .then(res => {
        const params = getState().packs.paramsForFetchPacks;
        dispatch(setAppSnackbarAC('success', res.statusText)); // check what is status text
        dispatch(fetchCardPacks(params));
      })
      .catch(err => {
        handleServerNetworkError(err.message, dispatch);
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'));
      });
  };

export const updatePack =
  (packId: string, newPackName: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    packsAPI
      .updatePack(packId, newPackName)
      .then(res => {
        const params = getState().packs.paramsForFetchPacks;
        dispatch(setAppSnackbarAC('success', res.statusText)); // check what is status text
        dispatch(fetchCardPacks(params));
      })
      .catch(err => {
        handleServerNetworkError(err.message, dispatch);
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'));
      });
  };

// __________________Types_______________________

export type PacksActionType =
  | SetMinMaxCardsCountAT
  | SetCardPacksAT
  | SetSearchValueAT
  | SetIsOnlyMyPacksAT
  | SetMinMaxFilterValueAT;

type SetCardPacksAT = ReturnType<typeof setCardPacksAC>;
type SetSearchValueAT = ReturnType<typeof setSearchValueAC>;
type SetIsOnlyMyPacksAT = ReturnType<typeof setIsOnlyMyPacksAC>;
type SetMinMaxFilterValueAT = ReturnType<typeof setMinMaxFilterValueAC>;
type SetMinMaxCardsCountAT = ReturnType<typeof setMinMaxCardsCountAC>;
