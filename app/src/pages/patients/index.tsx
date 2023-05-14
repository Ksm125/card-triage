import camelcaseKeys from "camelcase-keys";
import { cloneDeep, get, reduce, values } from "lodash";
import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { CardsGroup } from "../../components/CardsGroup";
import { TextInput } from "../../components/TextInput";
import { API_URL } from "../../config";
import { useFetchQuery } from "../../hooks/useFetch";
import { Card, CardApiFormat, CardStatus } from "../../typings/card";
import { filterCardByStatus } from "./_const";
import styles from "./styles.module.scss";

export const Patients = () => {
  const [search, setSearch] = useState("");
  const { isLoading, data: cards } = useFetchQuery<CardApiFormat[]>(`${API_URL}/cards`);
  // Ideally would have used normalizer library
  const initialNormalizedCards = useMemo(() => {
    if (cards) {
      return reduce(
        cards,
        (acc, card) => {
          acc[card.id] = camelcaseKeys(card);
          return acc;
        },
        {} as { [id: number]: Card }
      );
    }
    return cards;
  }, [cards]);
  const [currentCards, setCurrentCards] = useState<typeof initialNormalizedCards>({});

  useEffect(() => {
    setCurrentCards(cloneDeep(initialNormalizedCards));
  }, [initialNormalizedCards]);

  const todoCards = useMemo(
    () => filterCardByStatus(values(currentCards), [CardStatus.PENDING, CardStatus.REJECTED]),
    [currentCards]
  );
  const doneCards = useMemo(() => filterCardByStatus(values(currentCards), CardStatus.DONE), [currentCards]);

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  const onCardStatusChange = useCallback(
    (id: number, status: CardStatus) => {
      console.log({ id, status });
      setCurrentCards((currentCardsState) => {
        const cardToChange = get(currentCardsState, id);
        if (!cardToChange) return currentCardsState;

        cardToChange.status = status;
        return {
          ...currentCardsState,
          [id]: cardToChange,
        };
      });
    },
    [setCurrentCards]
  );

  const handleReset = () => {
    setCurrentCards(cloneDeep(initialNormalizedCards));
  };

  if (isLoading) {
    return <div>LOADING...</div>;
  }

  return (
    <div className={styles.patients}>
      <TextInput className={styles.patients__search} onChange={handleSearchChange} />
      <div className={styles.patients__actions}>
        <button onClick={handleReset}>Reset</button>
        <button>Save</button>
      </div>
      <div className={styles.patients__cards}>
        <CardsGroup
          title="Pending + Rejected"
          data={todoCards}
          searchFitler={search}
          onStatusChange={onCardStatusChange}
        />
        <CardsGroup title="Done" data={doneCards} searchFitler={search} onStatusChange={onCardStatusChange} />
      </div>
    </div>
  );
};
