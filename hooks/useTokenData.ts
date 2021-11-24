import { useEffect, useState, useRef, useCallback } from "react";
import useSWR from "swr";
import Token from "types/Token";
import Pair from "types/Pair";
import { useWatchedPairs } from "context/WatchedPairsContext";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useTokenData() {
  const { data: pairsData, error: pairsError } = useSWR("/api/tokens/pairs", fetcher);

  const { data: pricesData, error: pricesError } = useSWR("/api/tokens/latest", fetcher, {
    refreshInterval: 10000,
    refreshWhenHidden: true,
  });

  const { updatePrices } = useWatchedPairs();
  const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);
  const [allPairs, setAllPairs] = useState<Pair[]>([]);

  useEffect(() => {
    updatePrices(allPairs);
  }, [allPairs, updatePrices]);

  useEffect(() => {
    if (hasFetchedData) {
      setAllPairs((prevState) =>
        prevState.map((pair) => ({
          ...pair,
          price: parseFloat(Number(pricesData[pair.address]).toPrecision(5)),
        }))
      );
    }
  }, [hasFetchedData, pricesData]);

  useEffect(() => {
    if (!pairsData || !pricesData || hasFetchedData) return;

    const onlyVerified = Object.entries(pairsData).filter(
      (entry: any) => entry[1].asset0.verified && entry[1].asset1.verified
    );
    const formattedData: Pair[] = onlyVerified.map((entry: any) => {
      const asset0CircSupply = Number(
        entry[1].asset0.circSupply / (entry[1].asset0.decimals ? Math.pow(10, entry[1].asset0.decimals) : 1)
      );
      const asset1CircSupply = Number(
        entry[1].asset1.circSupply / (entry[1].asset1.decimals ? Math.pow(10, entry[1].asset1.decimals) : 1)
      );
      const primaryAsset = asset0CircSupply < asset1CircSupply ? entry[1].asset0 : entry[1].asset1;
      const secondaryAsset = asset0CircSupply < asset1CircSupply ? entry[1].asset1 : entry[1].asset0;
      const primary: Token = {
        address: primaryAsset.contractAddress,
        name: primaryAsset.name,
        symbol: primaryAsset.symbol,
        iconUrl: primaryAsset.icon,
      };
      const secondary: Token = {
        address: secondaryAsset.contractAddress,
        name: secondaryAsset.name,
        symbol: secondaryAsset.symbol,
      };

      return {
        primary,
        secondary,
        price: parseFloat(Number(pricesData[entry[0]]).toPrecision(5)),
        address: entry[0] as string,
        dex: entry[1].dex as string,
      };
    });
    setAllPairs(formattedData);
    setHasFetchedData(true);
  }, [pairsData, pricesData, hasFetchedData]);

  return { allPairs, pairsError, pricesError };
}
