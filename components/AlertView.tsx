import Switch from "react-switch";
import Alert from "types/Alert";
import s from "styles/Alert.module.css";
import { MdClose } from "react-icons/md";

type Props = {
  alert: Alert;
  currentPrice: number;
  currency: string;
  onRemoveAlert: () => void;
  onToggleAlertIsOn: () => void;
};

export default function AlertView({ alert, currentPrice, currency, onRemoveAlert, onToggleAlertIsOn }: Props) {
  return (
    <div className={s.alert}>
      <div className={currentPrice > alert.price ? s.below : s.above} />
      <div className={s.text}>
        {currentPrice > alert.price ? "Below " : "Above "}
        <span className={s.price}>
          {alert.price} {currency}
        </span>
      </div>
      <Switch
        onChange={onToggleAlertIsOn}
        checked={alert.isOn}
        uncheckedIcon={false}
        checkedIcon={false}
        width={48}
        className={s.switch}
      />
      <button onClick={onRemoveAlert} className={s.removeButton}>
        <MdClose size="16px" />
      </button>
    </div>
  );
}
