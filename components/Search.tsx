import { useWatchedPairs } from "context/WatchedPairsContext";
import useTokenData from "hooks/useTokenData";
import { useState, useEffect, useRef } from "react";
import Pair from "types/Pair";
import SearchListItem from "./SearchListItem";
import s from "styles/Search.module.css";

export default function Search() {
  const { allPairs, pairsError, pricesError } = useTokenData();
  const watchedPairs = useWatchedPairs();
  const [query, setQuery] = useState<string>("");
  const [matches, setMatches] = useState<Pair[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query) {
      setMatches([]);
    } else {
      const lowercaseQuery = query.toLowerCase();
      const newMatches = Object.values(allPairs).filter((pair: Pair) => {
        return (
          pair.primary.name.toLowerCase().includes(lowercaseQuery) ||
          pair.primary.symbol.toLowerCase().includes(lowercaseQuery) ||
          pair.secondary.name.toLowerCase().includes(lowercaseQuery) ||
          pair.secondary.symbol.toLowerCase().includes(lowercaseQuery)
        );
      }) as Pair[];
      setMatches(newMatches);
    }
  }, [query, allPairs]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Element) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Element)
      ) {
        setShowSearchResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchResultsRef, inputRef]);

  function handleClickPair(pair: Pair) {
    watchedPairs.addPair(pair);
  }

  return (
    <>
      <input
        ref={inputRef}
        placeholder="Search pairs..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className={s.input}
        onFocus={() => setShowSearchResults(true)}
      />

      {showSearchResults && !!matches.length && (
        <div className={s.searchListItems} ref={searchResultsRef}>
          {matches.map((match: Pair) => (
            <SearchListItem
              key={match.address}
              primaryName={match.primary.name}
              primarySymbol={match.primary.symbol}
              primaryIconUrl={match.primary.iconUrl}
              secondarySymbol={match.secondary.symbol}
              primaryAddress={match.primary.address}
              pairAddress={match.address}
              dex={match.dex}
              onClickPair={() => handleClickPair(match)}
              isWatched={watchedPairs.isPairWatched(match)}
            />
          ))}
        </div>
      )}
    </>
  );
}
