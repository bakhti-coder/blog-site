import { LIMIT } from "../../constants";
import { USER_ACTIONS } from "../types/user";
import request from "./../../server";

const updateStateChange = (payload) => {
  return { type: USER_ACTIONS, payload };
};

export const getUsers =
  (page = 1, search = "") =>
  async (dispatch) => {
    try {
      dispatch(updateStateChange({ loading: true }));
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("user", {
        params: { page, limit: LIMIT, search },
      });
      dispatch(updateStateChange({ users: data }));
      dispatch(updateStateChange({ total }));
    } finally {
      dispatch(updateStateChange({ loading: false }));
    }
  };

export const changePage = (page, search) => (dispatch) => {
  dispatch(updateStateChange({ activePage: page }));
  dispatch(getUsers(page, search));
};

export const searchUsers = (search) => (dispatch) => {
  dispatch(updateStateChange({ search }));
  dispatch(updateStateChange({ activePage: 1 }));
  dispatch(getUsers(1, search));
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

export const sendUsers =
  ({ values, selected, activePage, search, form }) =>
  async (dispatch) => {
    try {
      dispatch(updateStateChange({ isModalLoading: true }));
      selected === null
        ? await request.post("user", values)
        : await request.put(`user/${selected}`, values);
      dispatch(updateStateChange({ isModalOpen: false, imageData: null }));
      dispatch(getUsers(activePage, search));
      form.resetFields();
    } finally {
      dispatch(updateStateChange({ isModalLoading: false }));
    }
  };

export const editUsers = (form, id) => async (dispatch) => {
  dispatch(updateStateChange({ selected: id, isModalOpen: true }));
  const { data } = await request.get(`user/${id}`);
  dispatch(updateStateChange({ imageData: data.photo }));
  form.setFieldsValue(data);
};

export const showModal = (form) => async (dispatch) => {
  dispatch(
    updateStateChange({ selected: null, imageData: null, isModalOpen: true })
  );
  form.resetFields();
};

export const deleteUsers =
  ({ id, search }) =>
  async (dispatch) => {
    await request.delete(`user/${id}`);
    dispatch(getUsers(1, search));
    dispatch(updateStateChange({ activePage: 1 }));
  };
