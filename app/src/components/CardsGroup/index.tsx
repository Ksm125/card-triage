import { useMemo } from "react";
import { Card, CardStatus } from "../../typings/card";
import { CardPreview } from "../Card";
import styles from "./styles.module.scss";

export const CardsGroup = ({ title, data, searchFitler, onStatusChange }: CardsGroupProps) => {
  const filteredData = useMemo(() => {
    if (!searchFitler) return data;

    return data.filter(({ patientName }) => patientName.toLowerCase().includes(searchFitler.toLowerCase()));
  }, [data, searchFitler]);

  return (
    <div>
      <h2>{title}</h2>
      <div className={styles.cardGroup}>
        {filteredData.map((card) => (
          <CardPreview key={card.id} data={card} onStatusChange={onStatusChange} />
        ))}
      </div>
    </div>
  );
};

export interface CardsGroupProps {
  title: string;
  data: Card[];
  searchFitler?: string;
  onStatusChange: (id: number, status: CardStatus) => void;
}
