import axios from "axios";

const instance = axios.create({
  baseURL: "https://athaina.software",
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.error) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default instance;
