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
  maxCardsCount: 0,
  paramsForFetchPacks: {},
  isOnlyMyPacks: false,
  searchValue: '',
};
type InitialStateType = FetchPacksResponseType & {
  paramsForFetchPacks: FetchPacksParamsType;
  isOnlyMyPacks: boolean;
  searchValue: string;
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
    case 'packs/SET-SEARCH-VALUE':
      return {
        ...state,
        ...action.payload,
      };
    case 'packs/SET-IS-ONLY-MY-PACKS':
      return {
        ...state,
        isOnlyMyPacks: action.flag,
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
// ___________________Thunks_____________________

export const fetchCardPacks =
  (params: FetchPacksParamsType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'));
    packsAPI
      .fetchPacks(params)
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

export type PacksActionType = SetCardPacksAT | SetSearchValueAT | SetIsOnlyMyPacksAT;
type SetCardPacksAT = ReturnType<typeof setCardPacksAC>;
type SetSearchValueAT = ReturnType<typeof setSearchValueAC>;
type SetIsOnlyMyPacksAT = ReturnType<typeof setIsOnlyMyPacksAC>;
