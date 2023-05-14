import { Card, CardStatus } from "../../typings/card";

export const filterCardByStatus = (cards: Card[] | undefined | null, status: CardStatus | CardStatus[]) => {
  if (!cards) return [];

  if (Array.isArray(status)) {
    return cards.filter((card) => status.includes(card.status));
  }

  return cards.filter((card) => card.status === status);
};
