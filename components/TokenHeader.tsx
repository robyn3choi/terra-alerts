import Image from "next/image";
import { DEX_ICON_URLS } from "utils/constants";
import s from "styles/TokenHeader.module.css";
import NoTokenIcon from "./NoTokenIcon";

type Props = {
  primaryName: string;
  primarySymbol: string;
  primaryIconUrl?: string;
  secondarySymbol: string;
  dex: string;
};

export default function TokenHeader({ primaryIconUrl, primaryName, dex, primarySymbol, secondarySymbol }: Props) {
  return (
    <div className={s.tokenHeader}>
      <div className={s.icons}>
        {primaryIconUrl ? (
          <Image
            alt={primaryName}
            src={`/api/imageProxy?url=${encodeURIComponent(primaryIconUrl)}`}
            width={44}
            height={44}
          />
        ) : (
          <NoTokenIcon />
        )}
        <span className={s.dexIcon}>
          <Image alt={dex} src={DEX_ICON_URLS[dex]} width={20} height={20} className={s.dexIconImg} />
        </span>
      </div>
      <div className={s.nameAndSymbols}>
        <div className={s.name}>{primaryName}</div>
        <div className={s.pairSymbols}>
          <span className={s.primarySymbol}>{primarySymbol}</span>/{secondarySymbol}
        </div>
      </div>
    </div>
  );
}
