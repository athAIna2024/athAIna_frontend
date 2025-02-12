import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create(
  {
    baseURL: "http://localhost:8000",
    withCredentials: true 
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = Cookies.get("athAIna_csrfToken");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
