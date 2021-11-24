import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import Pair from "types/Pair";
import WatchedPair from "types/WatchedPair";
import { useWatchedPairs } from "./WatchedPairsContext";

type ProviderProps = { children: ReactNode };
type ProviderValue = {};

const NotificationContext = createContext<ProviderValue | undefined>(undefined);

export function NotificationProvider({ children }: ProviderProps) {
  const watchedPairs = useWatchedPairs();

  function notifyIfNeeded() {}

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
