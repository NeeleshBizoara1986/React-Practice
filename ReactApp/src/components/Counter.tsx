import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, RootState } from "../store/counterSlice";

const Counter: React.FC = () => {
  const value = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {value}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};

export default Counter;