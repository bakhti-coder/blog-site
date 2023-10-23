import { DECREMENT, INCREMENT } from "../types/counter";

export const Increment = () => ({ type: INCREMENT, payload: 2 });
export const Decrement = () => ({ type: DECREMENT, payload: 4 });
