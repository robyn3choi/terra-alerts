import Image from "next/image";
import s from "styles/Search.module.css";
import { DEX_ICON_URLS } from "utils/constants";
import { getPairSymbolsString } from "utils/helpers";
import NoTokenIcon from "./NoTokenIcon";
import TokenHeader from "./TokenHeader";

type Props = {
  primaryName: string;
  primarySymbol: string;
  primaryIconUrl?: string;
  secondarySymbol: string;
  primaryAddress: string;
  pairAddress: string;
  dex: string;
  onClickPair: () => void;
  isWatched: boolean;
};

export default function SearchListItem({
  primaryName,
  primarySymbol,
  primaryIconUrl,
  secondarySymbol,
  primaryAddress,
  pairAddress,
  dex,
  onClickPair,
  isWatched,
}: Props) {
  return (
    <button className={s.searchListItem} onClick={onClickPair} disabled={isWatched}>
      <TokenHeader
        primaryName={primaryName}
        primarySymbol={primarySymbol}
        primaryIconUrl={primaryIconUrl}
        secondarySymbol={secondarySymbol}
        dex={dex}
      />
      <div className={s.address}>{`Token: ${primaryAddress}`}</div>
      <div className={s.address}>{`Pair: ${pairAddress}`}</div>
    </button>
  );
}
