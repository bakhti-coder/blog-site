import {
  CATEGORY_FETCHING,
  CATEGORY_LOADING,
  CATEGORY_TOTAL,
} from "../types/categoty";

const initialState = {
  categries: [],
  total: 0,
  activePage: 1,
  loading: false,
  erro: null,
  search: "",
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_LOADING:
      return { ...state, loading: payload };
    case CATEGORY_FETCHING:
      return { ...state, categries: payload };
    case CATEGORY_TOTAL:
      return { ...state, total: payload };
  }
  return state;
};

export default categoryReducer;
