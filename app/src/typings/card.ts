import { CamelCaseKeys } from "camelcase-keys";

export enum CardStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  DONE = "DONE",
}

export interface CardApiFormat {
  arrhythmias: string[];
  created_date: string;
  id: number;
  patient_name: string;
  status: CardStatus;
}

export type Card = CamelCaseKeys<CardApiFormat>;
