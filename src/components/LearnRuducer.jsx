import { useState, useReducer } from "react";

function resulreducer(curentResulte, action) {
  if (action.type == "added") {
    return (
      Number(action.payload.firstNumber) + Number(action.payload.secondNumber)
    );
  }
    if (action.type == "Sub") {
    return (
      Number(action.payload.firstNumber) - Number(action.payload.secondNumber)
    );
  }
    if (action.type == "Mult") {
    return (
      Number(action.payload.firstNumber) * Number(action.payload.secondNumber)
    );
  }
    if (action.type == "Divide") {
    return (
      Number(action.payload.firstNumber) / Number(action.payload.secondNumber)
    );
  }
}

export default function LearnRuducer() {
  const [firstNumber, setFirstNumber] = useState();
  const [secondNumber, setSecondNumber] = useState();
  const [result, setResult] = useState(null);
  const [resuultone, dispatch] = useReducer(resulreducer, 0);

  const handleSum = () => {
    dispatch({
      type: "added",
      payload: { firstNumber: firstNumber, secondNumber: secondNumber },
    });
  };

  const handleSubtract = () => {
    dispatch({
      type: "Sub",
      payload: { firstNumber: firstNumber, secondNumber: secondNumber },
    });
  };

  const handleMultiply = () => {
    dispatch({
      type: "Mult",
      payload: { firstNumber: firstNumber, secondNumber: secondNumber },
    });
  };

  const handleDivide = () => {
    dispatch({
      type: "Divide",
      payload: { firstNumber: firstNumber, secondNumber: secondNumber },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        background: "blue",
      }}
    >
      <label>First Number</label>
      <input
        type="number"
        value={firstNumber}
        onChange={(e) => setFirstNumber(Number(e.target.value))}
      />

      <label>Second Number</label>
      <input
        type="number"
        value={secondNumber}
        onChange={(e) => setSecondNumber(Number(e.target.value))}
      />

      <button onClick={handleSum}>sum</button>
      <button onClick={handleSubtract}>subtract</button>
      <button onClick={handleMultiply}>multiply</button>
      <button onClick={handleDivide}>divide</button>

      <h2>{resuultone}</h2>
    </div>
  );
}
