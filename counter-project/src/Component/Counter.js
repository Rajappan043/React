import { useState } from "react";
import "./Counter.css";
export default function Counter() {
  const [count, setCount] = useState(0);
  const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleDecrease = () => {
    setCount(count - 1);
  };
  return (
    <>
      <div className="count">Count:{count}</div>
      <section>
        <button onClick={handleIncrease}>+</button>
        <button onClick={handleDecrease}>-</button>
      </section>
    </>
  );
}
