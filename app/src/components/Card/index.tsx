import { useCallback, useRef, useState } from "react";
import { Card, CardStatus } from "../../typings/card";
import { CardMenu } from "./CardMenu";
import styles from "./styles.module.scss";
import { useOnClickOutside } from "usehooks-ts";

export const CardPreview = ({ data, onStatusChange }: CardPreviewProps) => {
  const { patientName, createdDate } = data;
  const [isMenuOpen, setIsOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const handleChangeStatus = useCallback(
    (newStatus: CardStatus) => {
      onStatusChange(data.id, newStatus);
    },
    [onStatusChange, data.id]
  );

  const handleClickOutsideMenu = useCallback(() => setIsOpenMenu(false), [setIsOpenMenu]);

  useOnClickOutside(menuRef, handleClickOutsideMenu);

  return (
    <div className={styles.cardPreview}>
      <button className={styles.cardPreview__menuButton} onClick={() => setIsOpenMenu((currentValue) => !currentValue)}>
        ...
      </button>
      <p>Name: {patientName}</p>
      <p>Creation date: {createdDate}</p>
      <CardMenu ref={menuRef} isOpen={isMenuOpen} data={data} handleChangeStatus={handleChangeStatus} />
    </div>
  );
};

export interface CardPreviewProps {
  data: Card;
  onStatusChange: (id: number, newStatus: CardStatus) => void;
}
