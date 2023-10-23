import request from "../../server";
import {
  CATEGORY_FETCHING,
  CATEGORY_LOADING,
  CATEGORY_TOTAL,
} from "../types/categoty";

export const getCategories = () => {
  return async (dispatch) => {
    dispatch({ type: CATEGORY_LOADING, payload: true });
    const {
      data: {
        data,
        pagination: { total },
      },
    } = await request.get("category");
    dispatch({ type: CATEGORY_FETCHING, payload: data });
    dispatch({ type: CATEGORY_TOTAL, payload: total });
    dispatch({ type: CATEGORY_LOADING, payload: false });
  };
};
