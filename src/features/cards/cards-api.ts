import { instance } from 'api/config/apiConfig';

export const cardsAPI = {
  getCards(URLParams: GetCardsParamsType) {
    return instance.get<GetCardsResponseType>('cards/card', {
      params: {
        cardAnswer: URLParams.cardAnswer,
        cardQuestion: URLParams.cardQuestion,
        cardsPack_id: URLParams.cardsPack_id,
        min: URLParams.min,
        max: URLParams.max,
        sortCards: URLParams.sortCards,
        page: URLParams.page,
        pageCount: URLParams.pageCount,
      },
    });
  },
  createCard(params: CreateCardParamsType) {
    return instance.post('cards/card', {
      card: {
        cardsPack_id: params.cardsPack_id,
        question: params.question,
        answer: params.answer,
      },
    });
  },
};

export type GetCardsParamsType = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};
export type CreateCardParamsType = {
  cardsPack_id: string;
  question?: string; // если не отправить будет таким
  answer?: string; // если не отправить будет таким
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

export type GetCardsResponseType = {
  cards: CardsType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};
export type CardsType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: string;
  updated: string;
  _id: string;
};
