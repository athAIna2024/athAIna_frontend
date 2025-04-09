import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8009",
  withCredentials: true,
});

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

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response; 
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; 

      try {
        const refreshResponse = await axios.post(
          "http://localhost:8009/account/token/refresh/",
          {},
          { withCredentials: true }
        );

        Cookies.set("access_token", `${response.data.access}`, {
          secure: true,
          sameSite: "Strict",
          expires: 3600 / (24 * 60 * 60),
        });
        Cookies.set("refresh_token", `${response.data.refresh}`, {
          secure: true,
          sameSite: "Strict",
          expires: 1209600 / (24 * 60 * 60),
        });

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); 
  }
);

export default axiosInstance;
