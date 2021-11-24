import Image from "next/image";
import NoTokenIcon from "./NoTokenIcon";
import { DEX_ICON_URLS } from "utils/constants";
import { getPairSymbolsString, getPairPriceString } from "utils/helpers";
import WatchedPair from "types/WatchedPair";
import s from "styles/WatchList.module.css";
import { useState } from "react";
import AddAlert from "./AddAlert";
import Alert from "types/Alert";
import AlertView from "./AlertView";
import TokenHeader from "./TokenHeader";
import { MdClose } from "react-icons/md";

type Props = {
  pair: WatchedPair;
  alerts: Alert[];
  onRemovePair: () => void;
  onAddAlert: (price: number) => void;
  onRemoveAlert: (alert: Alert) => void;
  onToggleAlertIsOn: (alert: Alert) => void;
};

export default function WatchListItem({
  pair,
  alerts,
  onRemovePair,
  onAddAlert,
  onRemoveAlert,
  onToggleAlertIsOn,
}: Props) {
  const [isAddingAlert, setIsAddingAlert] = useState<boolean>(false);

  function handleAddAlert(price: number) {
    setIsAddingAlert(false);
    onAddAlert(price);
  }

  return (
    <div className={s.watchListItem}>
      <TokenHeader
        primaryName={pair.primary.name}
        primarySymbol={pair.primary.symbol}
        primaryIconUrl={pair.primary.iconUrl}
        secondarySymbol={pair.secondary.symbol}
        dex={pair.dex}
      />
      <div className={s.price}>{getPairPriceString(pair)}</div>
      <button onClick={onRemovePair} className={s.removeButton}>
        <MdClose size="18px" />
      </button>
      <div className={s.alerts}>
        {alerts.map((a) => (
          <AlertView
            key={a.address + a.price}
            alert={a}
            currentPrice={pair.price}
            currency={pair.secondary.symbol}
            onRemoveAlert={() => onRemoveAlert(a)}
            onToggleAlertIsOn={() => onToggleAlertIsOn(a)}
          />
        ))}
      </div>
      {isAddingAlert ? (
        <AddAlert
          currency={pair.secondary.symbol}
          onAddAlert={handleAddAlert}
          onCancel={() => setIsAddingAlert(false)}
          alerts={alerts}
        />
      ) : (
        <button className={s.addAlertButton} onClick={() => setIsAddingAlert(true)}>
          + Add alert
        </button>
      )}
    </div>
  );
}
