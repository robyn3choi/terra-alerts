import { useWatchedPairs } from "context/WatchedPairsContext";
import s from "styles/WatchList.module.css";
import WatchListItem from "./WatchListItem";

export default function WatchList() {
  const watchedPairs = useWatchedPairs();

  return (
    <div className={s.watchList}>
      {watchedPairs.pairs.map((p) => (
        <WatchListItem
          key={p.address}
          pair={p}
          onRemovePair={() => watchedPairs.removePair(p)}
          onAddAlert={(price) => watchedPairs.addAlert(p.address, price)}
          alerts={watchedPairs.alerts.filter((a) => a.address === p.address)}
          onRemoveAlert={watchedPairs.removeAlert}
          onToggleAlertIsOn={watchedPairs.toggleAlertIsOn}
        />
      ))}
    </div>
  );
}
