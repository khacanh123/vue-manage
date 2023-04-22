import customAxios from "../utils/customAxios";
export const RequestAPI = (data) => {
    const { url, method, payload } = data;
    // convert objec to a query string
    return customAxios
      .request({
        url: url,
        method,
        data: payload,
      })
      .then((res) => {
       
        return res;
      })
      .catch((err) => {
        
        throw err;
      });
  };
  