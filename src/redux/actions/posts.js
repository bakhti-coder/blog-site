import { POST_ACTIONS } from "../types/posts";
import { LIMIT } from "../../constants";
import request from "./../../server";

const updateStateChange = (payload) => {
  return { type: POST_ACTIONS, payload };
};

export const getPosts =
  (page = 1, search = "") =>
  async (dispatch) => {
    try {
      dispatch(updateStateChange({ loading: true }));
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("post", {
        params: { page, limit: LIMIT, search },
      });
      dispatch(updateStateChange({ posts: data }));
      dispatch(updateStateChange({ total }));
    } finally {
      dispatch(updateStateChange({ loading: false }));
    }
  };

export const changePage = (page, search) => (dispatch) => {
  dispatch(updateStateChange({ activePage: page }));
  dispatch(getPosts(page, search));
};

export const searchPosts = (search) => (dispatch) => {
  dispatch(updateStateChange({ search }));
  dispatch(updateStateChange({ activePage: 1 }));
  dispatch(getPosts(1, search));
};

export const controlModal = (payload) => (dispatch) => {
  dispatch(updateStateChange({ isModalOpen: payload }));
};

export const uploadImage = (file) => async (dispatch) => {
  try {
    dispatch(updateStateChange({ imageLoading: true }));
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await request.post("upload", formData);
    dispatch(updateStateChange({ imageData: data }));
  } finally {
    dispatch(updateStateChange({ imageLoading: false }));
  }
};

export const sendPosts =
  ({ values, selected, activePage, search, form }) =>
  async (dispatch) => {
    try {
      dispatch(updateStateChange({ isModalLoading: true }));
      selected === null
        ? await request.post("post", values)
        : await request.put(`post/${selected}`, values);
      dispatch(updateStateChange({ isModalOpen: false, imageData: null }));
      dispatch(getPosts(activePage, search));
      form.resetFields();
    } finally {
      dispatch(updateStateChange({ isModalLoading: false }));
    }
  };

export const editPosts = (form, id) => async (dispatch) => {
  dispatch(updateStateChange({ selected: id, isModalOpen: true }));
  const { data } = await request.get(`post/${id}`);
  dispatch(updateStateChange({ imageData: data.photo }));
  form.setFieldsValue(data);
};

export const showModal = (form) => async (dispatch) => {
  dispatch(
    updateStateChange({ selected: null, imageData: null, isModalOpen: true })
  );
  form.resetFields();
};

export const deletePosts =
  ({ id, search }) =>
  async (dispatch) => {
    await request.delete(`post/${id}`);
    dispatch(getPosts(1, search));
    dispatch(updateStateChange({ activePage: 1 }));
  };
