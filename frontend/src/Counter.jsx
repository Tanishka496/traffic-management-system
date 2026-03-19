import React, { useState } from "react";

function Counter() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(0);

  const calculateSum = () => {
    setResult(Number(num1) + Number(num2));
  };

  return (
    <div>
      <h2>Sum of Two Numbers</h2>

      <input
        type="number"
        placeholder="Enter first number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <button onClick={calculateSum}>
        Calculate Sum
      </button>

      <h3>Result: {result}</h3>
    </div>
  );
}

export default Counter;
