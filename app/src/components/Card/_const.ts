import { CardStatus } from "../../typings/card";
import { Card } from "../../typings/card";

export const CARD_STATUS_CHANGE = {
  [CardStatus.PENDING]: CardStatus.DONE,
  [CardStatus.REJECTED]: CardStatus.DONE,
  [CardStatus.DONE]: CardStatus.REJECTED,
} as const;
