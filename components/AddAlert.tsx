import { useEffect, useState } from "react";
import s from "styles/AddAlert.module.css";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCheckCircle } from "react-icons/md";
import Alert from "types/Alert";
import { MdClose } from "react-icons/md";

type Props = {
  currency: string;
  onAddAlert: (price: number) => void;
  onCancel: () => void;
  alerts: Alert[];
};

export default function AddAlert({ currency, onAddAlert, onCancel, alerts }: Props) {
  const [price, setPrice] = useState<number | null>(null);

  function handleKeyPress(key: string) {
    if (key === "Enter" && price) {
      onAddAlert(price);
    }
  }

  return (
    <div className={s.addAlert}>
      <button className={s.cancelButton} onClick={onCancel}>
        <MdClose size="16px" />
      </button>
      <button
        onClick={() => onAddAlert(price as number)}
        className={s.addButton}
        disabled={!price || !!alerts.find((a) => a.price === price)}
      >
        OK
      </button>
      <input
        autoFocus
        type="number"
        step="any"
        min="0"
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        onKeyPress={(e) => handleKeyPress(e.key)}
        className={s.input}
      />
      <span className={s.currency}>{currency}</span>
    </div>
  );
}
