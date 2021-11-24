import { useState } from "react";

type Props = {
  currency: string;
  onAddAlert: (price: number) => void;
};

export default function AddAlert({ currency, onAddAlert }: Props) {
  const [price, setPrice] = useState<number>(0);

  function handleKeyPress(key: string) {
    if (key === "Enter") {
      onAddAlert(price);
    }
  }

  return (
    <div>
      <input
        autoFocus
        type="number"
        step="any"
        min="0"
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        onKeyPress={(e) => handleKeyPress(e.key)}
      />
      {currency}
      <button onClick={() => onAddAlert(price)}>Add</button>
    </div>
  );
}
