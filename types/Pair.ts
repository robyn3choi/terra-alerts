import Token from "./Token";

export default interface Pair {
  primary: Token;
  secondary: Token;
  address: string;
  price: number;
  dex: string;
}
