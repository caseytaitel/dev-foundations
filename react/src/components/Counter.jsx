import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    setCount(count - 1);
  }

  return (
    <>
      <h2>Count: {count}</h2>
      <button onClick={handleDecrement}>–</button>
      <button onClick={handleIncrement}>+</button>
    </>
  );
}
