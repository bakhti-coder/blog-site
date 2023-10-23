import request from "../../server";
import { LIMIT } from "../../constants";

import {
  CATEGORY_FETCHING,
  CATEGORY_LOADING,
  CATEGORY_PAGE,
  CATEGORY_SEARCH,
  CATEGORY_TOTAL,
} from "../types/categoty";

export const getCategories = (page = 1, search = "") => {
  return async (dispatch) => {
    dispatch({ type: CATEGORY_LOADING, payload: true });
    const {
      data: {
        data,
        pagination: { total },
      },
    } = await request.get("category", {
      params: { page, limit: LIMIT, search },
    });
    dispatch({ type: CATEGORY_FETCHING, payload: data });
    dispatch({ type: CATEGORY_TOTAL, payload: total });
    dispatch({ type: CATEGORY_LOADING, payload: false });
  };
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_PAGE, payload: page });
    dispatch(getCategories(page));
  };
};

export const searchCategories = (search) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_SEARCH, payload: search });
    dispatch({ type: CATEGORY_PAGE, payload: 1 });
    dispatch(getCategories(1, search));
  };
};
