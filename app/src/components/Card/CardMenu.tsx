import { ForwardedRef, forwardRef } from "react";
import { Card, CardStatus } from "../../typings/card";
import { CARD_STATUS_CHANGE } from "./_const";
import styles from "./styles.module.scss";

export const CardMenu = forwardRef(
  ({ isOpen, data, handleChangeStatus }: CardMenuProps, ref: ForwardedRef<HTMLDivElement>) => {
    if (!isOpen) return null;

    return (
      <div ref={ref} className={styles.cardPreview__menu}>
        <p onClick={() => handleChangeStatus(CARD_STATUS_CHANGE[data.status])}>{CARD_STATUS_CHANGE[data.status]}</p>
      </div>
    );
  }
);

export interface CardMenuProps {
  isOpen: boolean;
  data: Card;
  handleChangeStatus: (newStatus: CardStatus) => void;
}
