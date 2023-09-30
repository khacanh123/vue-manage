import customAxios from "./customAxios";

const ConnectAPI = (data) => {
  const {
    url,
    method,
    params,
    pagination,
    payload,
    notify,
    hiddenMessage = false,
  } = data;
  // convert objec to a query string
  const pathFomated = generateRoutePath(url, params, pagination);
  return customAxios
    .request({
      url: pathFomated,
      method,
      data: payload,
    })
    .then((res) => res);
};
const generateRoutePath = (url, params, pagination) => {
  let urlFormatted = url;
  if (urlFormatted[urlFormatted.length - 1] === "/") {
    urlFormatted = urlFormatted.slice(0, -1);
  }
  if (params && pagination) {
    const queryParams = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    const queryPagination = `limit=${pagination?.pageSize}&page=${pagination?.pageIndex}`;

    urlFormatted = `${urlFormatted}?${queryParams}&${queryPagination}`;
  } else if (params) {
    const queryParams = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    urlFormatted = `${urlFormatted}?${queryParams}`;
  } else if (pagination) {
    const queryPagination = `limit=${pagination?.pageSize}&page=${pagination?.pageIndex}`;
    urlFormatted = `${urlFormatted}?${queryPagination}`;
  }
  return urlFormatted;
};
export default ConnectAPI;
