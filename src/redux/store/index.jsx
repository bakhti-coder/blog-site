import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import counterReducer from "../reducers/counter";
import categoryReducer from "../reducers/category";

const rootReducers = combineReducers({
  counter: counterReducer,
  category: categoryReducer,
});

export const Store = createStore(rootReducers, applyMiddleware(thunk));

const StoreProvider = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
