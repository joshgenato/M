import axios from 'axios';

const API_URL = 'https://localhost:44341';

export const apiPost = (uri, data) => {
  return api(uri, 'post', data);
};

export const apiGet = (uri) => {
  return api(uri, 'get');
};

const api = async (uri, method, data = null) => {
  let request = {
    url: `/${uri}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
  };

  if (data !== null) {
    request = {
      ...request,
      data,
    };
  }
  return axios(request)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response);
    });
};

const apiClient = {
  post: apiPost,
  get: apiGet,
};

export default apiClient;
