import Pair from "./Pair";
import Alert from "./Alert";

export default interface WatchedPair extends Pair {
  alerts: Alert[];
}
