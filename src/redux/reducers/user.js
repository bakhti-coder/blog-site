import { USER_ACTIONS } from "../types/user";

const initialState = {
  users: [],
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
    case USER_ACTIONS:
      return { ...state, ...payload };
  }
  return state;
};

export default categoryReducer;
