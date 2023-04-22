import axios from 'axios';
import decodeJWT from 'jwt-decode';

// Step-1: Create a new Axios instance with a custom config.
const API_URL_ADMIN = 'https://apiemsdev.hocmai.net/';
const customAxios = axios.create({
  baseURL: API_URL_ADMIN,
  // timeout: 30000,
});

// Step-2: Create request, response & error handlers
const requestHandler = (request) => {
  const AUTH_TOKEN = localStorage.getItem('tk');
  if (AUTH_TOKEN) {
    try {
      const expired = decodeJWT<string>(AUTH_TOKEN);
      const date = new Date();
      const now = date.getTime() / 1000;
      if (expired.iat && now < expired.exp) {
        request.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
        return request;
      } else {
        alert('Phiên đăng nhập hết hạn vui lòng đăng nhập lại');
        localStorage.removeItem('tk');
        window.location.href = '/';
      }
    } catch (error) {
      alert('Phiên đăng nhập hết hạn vui lòng đăng nhập lại');
      localStorage.removeItem('tk');
      window.location.href = '/';
    }
  } else {
    return request;
  }
};

const responseHandler = (response) => {
  return response.data;
};

const errorHandler = (error) => {
  Promise.reject(error.response.data).catch((err) => {
    if (err.code === 'invalid_token') {
      alert('Phiên đăng nhập hết hạn vui lòng đăng nhập lại');
      localStorage.removeItem('tk');
      window.location.href = '/';
    }
  });
  return Promise.reject(error.response.data);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
