import { createContext, useContext, ReactNode, useState, useEffect, useCallback, useRef } from "react";
import Pair from "types/Pair";
import Alert from "types/Alert";
import { notify } from "utils/helpers";

const pairsStorageKey = "TerralertPairs";
const alertsStorageKey = "TerralertAlerts";

type StringToNumber = { [key: string]: number };
type ProviderProps = { children: ReactNode };
type ProviderValue = {
  pairs: Pair[];
  addPair: (pair: Pair) => void;
  removePair: (pairToRemove: Pair) => void;
  isPairWatched: (pair: Pair) => boolean;
  updatePrices: (allPairs: Pair[]) => void;
  alerts: Alert[];
  addAlert: (pairAddress: string, price: number) => void;
  removeAlert: (alertToRemove: Alert) => void;
  toggleAlertIsOn: (alertToToggle: Alert) => void;
};

const WatchedPairsContext = createContext<ProviderValue | undefined>(undefined);

export function WatchedPairsProvider({ children }: ProviderProps) {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const prices = useRef<StringToNumber>({});

  useEffect(() => {
    const storedPairs = localStorage.getItem(pairsStorageKey);
    if (storedPairs) {
      setPairs(JSON.parse(storedPairs));
    }
    const storedAlerts = localStorage.getItem(alertsStorageKey);
    if (storedAlerts) {
      setAlerts(JSON.parse(storedAlerts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(pairsStorageKey, JSON.stringify(pairs));
  }, [pairs]);

  useEffect(() => {
    localStorage.setItem(alertsStorageKey, JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    const newPrices: StringToNumber = {};
    pairs.forEach((pair) => (newPrices[pair.address] = pair.price));
    let havePricesChanged = false;
    for (const address in prices.current) {
      if (prices.current[address] !== newPrices[address]) {
        havePricesChanged = true;
        break;
      }
    }
    if (!havePricesChanged) {
      prices.current = newPrices;
      return;
    }

    const alertsToTurnOff: Alert[] = [];
    for (const alert of alerts) {
      if (alert.isOn && prices.current[alert.address]) {
        const oldPrice = prices.current[alert.address];
        const newPrice = newPrices[alert.address];
        const newlyAboveAlertPrice = oldPrice < alert.price && newPrice >= alert.price;
        const newlyBelowAlertPrice = oldPrice > alert.price && newPrice <= alert.price;
        if (newlyAboveAlertPrice || newlyBelowAlertPrice) {
          const pair = pairs.find((p) => p.address === alert.address);
          if (pair) {
            const icon = pairs.find((p) => p.address === alert.address)?.primary.iconUrl;
            notify(pair.primary.symbol, pair.secondary.symbol, alert.price, newlyBelowAlertPrice, icon);
            alertsToTurnOff.push(alert);
          }
        }
      }
    }

    setAlerts((prevAlerts) => {
      const nextAlerts = prevAlerts.map((a) => {
        const toTurnOff = alertsToTurnOff.find((x) => x.address === a.address && x.price === a.price);
        if (toTurnOff) {
          a.isOn = false;
        }
        return a;
      });
      return nextAlerts;
    });

    prices.current = newPrices;
  }, [prices, pairs, alerts]);

  function addPair(pair: Pair) {
    console.log("add");
    setPairs((prevState) => [...prevState, { ...pair, alerts: [] }]);
  }

  function removePair(pairToRemove: Pair) {
    setPairs((prevState) => {
      const nextState = [...prevState];
      const index = nextState.findIndex((p) => p.address === pairToRemove.address);
      nextState.splice(index, 1);
      return nextState;
    });
    setAlerts((prevAlerts) => {
      const nextAlerts = prevAlerts.filter((a) => a.address !== pairToRemove.address);
      console.log(nextAlerts);
      return nextAlerts;
    });
  }

  function isPairWatched(pair: Pair) {
    return pairs.some((p) => p.address === pair.address);
  }

  const updatePrices = useCallback((allPairs: Pair[]) => {
    setPairs((prevPairs) =>
      prevPairs.map((oldWatchedPair) => {
        const newPair = allPairs.find((p) => p.address === oldWatchedPair.address);
        const newPrice = newPair ? newPair.price : oldWatchedPair.price;
        return { ...oldWatchedPair, price: newPrice };
      })
    );
  }, []);

  function addAlert(pairAddress: string, price: number) {
    setAlerts((prevAlerts) => {
      const newAlerts = [...prevAlerts];
      newAlerts.push({ address: pairAddress, price, isOn: true });
      return newAlerts;
    });
  }

  function removeAlert(alertToRemove: Alert) {
    setAlerts((prevAlerts) => {
      const nextAlerts = [...prevAlerts];
      const index = nextAlerts.findIndex((p) => p.address === alertToRemove.address && p.price === alertToRemove.price);
      nextAlerts.splice(index, 1);
      return nextAlerts;
    });
  }

  function toggleAlertIsOn(alertToToggle: Alert) {
    setAlerts((prevAlerts) => {
      const newAlerts = [...prevAlerts];
      const index = newAlerts.findIndex((a) => a.address === alertToToggle.address && a.price === alertToToggle.price);
      if (index !== -1) {
        newAlerts[index].isOn = !newAlerts[index].isOn;
      }
      return newAlerts;
    });
  }

  return (
    <WatchedPairsContext.Provider
      value={{
        pairs,
        addPair,
        removePair,
        isPairWatched,
        updatePrices,
        alerts,
        addAlert,
        removeAlert,
        toggleAlertIsOn,
      }}
    >
      {children}
    </WatchedPairsContext.Provider>
  );
}

export function useWatchedPairs() {
  const context = useContext(WatchedPairsContext);
  if (context === undefined) {
    throw new Error("useWatchedPairs must be used within a WatchedPairsProvider");
  }
  return context;
}
