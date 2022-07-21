import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const get = async (url, headers) => {
  return await AxiosInstance({
    method: 'GET',
    url,
    headers,
  });
};

const getById = async (url, headers, params) => {
  return await AxiosInstance({
    method: 'GET',
    url,
    headers,
    params,
  });
};

const create = async (url, data, headers) => {
  return await AxiosInstance({
    method: 'POST',
    url,
    headers,
    data,
  });
};

const update = async (url, data, headers) => {
  return await AxiosInstance({
    method: 'PUT',
    url,
    headers,
    data,
  });
};

const _delete = async (url, headers) => {
  return await AxiosInstance({
    method: 'DELETE',
    url,
    headers,
  });
};

const initAxiosInterceptors = () => {
  AxiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => console.error('Interceptor request: ', error)
  );

  AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        console.error('Cerrar sesión');
      }
      return Promise.reject(error);
    }
  );
};

export const http = {
  get,
  getById,
  create,
  update,
  delete: _delete,
  initAxiosInterceptors,
};
