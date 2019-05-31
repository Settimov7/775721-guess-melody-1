import axios from 'axios';
import {ActionCreator} from "./reducer/user/user";

const CONFIG = {
  baseURL: `https://es31-server.appspot.com/guess-melody`,
  timeout: 5000,
  withCredentials: true
};

const HTTP_STATUS = {
  FORBIDDEN: 403,
};

export const createAPI = (dispatch) => {
  const api = axios.create(CONFIG);

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === HTTP_STATUS.FORBIDDEN) {
      dispatch(ActionCreator.requireAuthorization(true));
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
