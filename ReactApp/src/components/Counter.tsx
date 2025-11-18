import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, fetchRandomNumber } from "../store/counterSlice";
import { AppDispatch, RootState } from "../store/store";

const Counter: React.FC = () => {
  const {value, loading} = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <p>Count: <pre>{JSON.stringify(value)}</pre></p>
      {loading && <p>Loading...</p>}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(fetchRandomNumber())}>Fetch Random Number</button>
    </div>
  );
};

export default Counter;