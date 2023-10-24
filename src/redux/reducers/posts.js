import { POST_ACTIONS } from "../types/posts";

const initialState = {
  posts: [],
  total: 0,
  activePage: 1,
  loading: false,
  search: "",
  selected: null,
  isModalLoading: false,
  isModalOpen: false,
  imageData: null,
  imageLoading: false,
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_ACTIONS:
      return { ...state, ...payload };
  }
  return state;
};

export default categoryReducer;
