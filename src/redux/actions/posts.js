import request from "../../server";
import { LIMIT } from "../../constants";
import {
  POSTS_FETCHING,
  POSTS_LOADING,
  POSTS_PAGE,
  POSTS_SEARCH,
  POSTS_TOTAL,
} from "../types/posts";

export const getPosts = (page = 1, search = "") => {
  return async (dispatch) => {
    dispatch({ type: POSTS_LOADING, payload: true });
    const {
      data: {
        data,
        pagination: { total },
      },
    } = await request.get("post", {
      params: { page, limit: LIMIT, search },
    });
    dispatch({ type: POSTS_FETCHING, payload: data });
    dispatch({ type: POSTS_TOTAL, payload: total });
    dispatch({ type: POSTS_LOADING, payload: false });
  };
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch({ type: POSTS_PAGE, payload: page });
    dispatch(getPosts(page));
  };
};

export const searchPosts = (search) => {
  return (dispatch) => {
    dispatch({ type: POSTS_SEARCH, payload: search });
    dispatch({ type: POSTS_PAGE, payload: 1 });
    dispatch(getPosts(1, search));
  };
};
