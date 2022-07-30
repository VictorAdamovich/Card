// import { AxiosResponse } from 'axios';

import { instance } from 'api/config/apiConfig';
import { SortPacksFlag } from 'common/enums/sort-packs-flag';

export const packsAPI = {
  fetchPacks(URLParams: FetchPacksParamsType) {
    return instance.get<FetchPacksResponseType>('cards/pack', {
      params: {
        user_id: URLParams.user_id,
        packName: URLParams.packName,
        min: URLParams.min,
        max: URLParams.max,
        sortPacks: URLParams.sortPacks,
        page: URLParams.page,
        pageCount: URLParams.pageCount,
      },
    });
  },

  createPack(packName: string, deckCover?: string) {
    return instance.post('cards/pack', {
      cardsPack: {
        name: packName,
        deckCover, // адресс обложки колоды ( url or base64)
        private: false,
      },
    });
  },

  deletePack(packId: string) {
    return instance.delete(`cards/pack?id=${packId}`);
  },

  updatePack(packId: string, newPackName: string) {
    return instance.put('cards/pack', {
      cardsPack: {
        _id: packId,
        name: newPackName,
      },
    });
  },
};

export type FetchPacksParamsType = {
  user_id?: string;
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: SortPacksFlag;
  page?: number;
  pageCount?: number;
};

export type CardPackType = {
  _id: string; // CardPack id (id колоды карточек)
  user_id: string; // (id юзера создавшего колоду)
  user_name: string; // имя юзера создавшего колоду
  name: string; // имя колоды
  grade: number; // оценка колоды
  shots: number; // количество проголосовавших
  updated: '2022-07-30T18:23:57.858Z';
  deckCover: null | string; // путь к обложке колоды
  cardsCount: number; // количество вопросов
  // "path": string  // хз что это
  // "private": boolean  // приватна ли колода Видна ли остальным юзерам
  // "type": "pack",
  // "rating": 0,
  // "created": "2022-07-30T17:56:21.656Z",
  // "more_id": "62dfe5868cf0b21258ba4d48",
  // "__v": 0,
};

export type FetchPacksResponseType = {
  cardPacks: CardPackType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
};

/* const response = {
  cardPacks: [
    {
      _id: '62e570c51c90be4f10b2554c',
      user_id: '62dfe5868cf0b21258ba4d48',
      user_name: 'goro_goro',
      private: false,
      name: '???',
      path: '/def',
      grade: 0,
      shots: 0,
      cardsCount: 3,
      type: 'pack',
      rating: 0,
      created: '2022-07-30T17:56:21.656Z',
      updated: '2022-07-30T18:23:57.858Z',
      more_id: '62dfe5868cf0b21258ba4d48',
      __v: 0,
      deckCover: null,
    },
    {
      _id: '62e576d61c90be4f10b25553',
      user_id: '62dfe5868cf0b21258ba4d48',
      user_name: 'goro_goro',
      private: false,
      name: 'Test paaaack',
      path: '/def',
      grade: 0,
      shots: 0,
      cardsCount: 0,
      type: 'pack',
      rating: 0,
      created: '2022-07-30T18:22:14.362Z',
      updated: '2022-07-30T18:22:14.362Z',
      more_id: '62dfe5868cf0b21258ba4d48',
      __v: 0,
    },
    {
      _id: '62dfff9be72dee3114c2b040',
      user_id: '62d1802ef949c92acc6966d5',
      user_name: '12qqqq3@mail.ru',
      private: false,
      name: 'privet pipli',
      path: '/def',
      grade: 0,
      shots: 0,
      cardsCount: 0,
      type: 'pack',
      rating: 0,
      created: '2022-07-26T14:52:11.039Z',
      updated: '2022-07-30T16:35:37.000Z',
      more_id: '62d1802ef949c92acc6966d5',
      __v: 0,
      deckCover: null,
    },
    {
      _id: '62e553f1455f1700048948f4',
      user_id: '62dc16eac8a755525c13f6a6',
      user_name: 'Ilya',
      private: false,
      name: 'create new cool pack',
      path: '/def',
      grade: 0,
      shots: 0,
      deckCover: '',
      cardsCount: 0,
      type: 'pack',
      rating: 0,
      created: '2022-07-30T15:53:21.304Z',
      updated: '2022-07-30T15:53:21.304Z',
      more_id: '62dc16eac8a755525c13f6a6',
      __v: 0,
    },
  ],
  page: 1,
  pageCount: 4,
  cardPacksTotalCount: 5833,
  minCardsCount: 0,
  maxCardsCount: 110,
  token: '01fd3640-103b-11ed-a3f9-5f6681b6de52',
  tokenDeathTime: 1659218914085,
}; */
