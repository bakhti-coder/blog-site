import { useDispatch, useSelector } from "react-redux";

import { Decrement, Increment } from "../../../redux/actions/counter";

import "./Dashboard.scss";

const DashboardPage = () => {
  const {
    counter: { counter },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  return (
    <div>
      <h1>Counter {counter}</h1>
      <button onClick={() => dispatch(Decrement())}>-</button>
      <button onClick={() => dispatch(Increment())}>+</button>
    </div>
  );
};

export default DashboardPage;
