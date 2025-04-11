import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";

const router = useRouter();

const axiosInstance = axios.create({
  baseURL: "http://localhost:8009",
  withCredentials: true,
});

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // If there's an error decoding, consider the token expired
  }
};

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
    return response; // Pass through successful responses
  },
  async (error) => {
    console.error("Interceptor caught an error:", error); // Debug log
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
          {}, // No need to include the refresh token manually if it's HttpOnly
          { withCredentials: true }
        );

        console.log("Token refresh successful:", refreshResponse.data);

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error(
          "Token refresh failed:",
          refreshError.response?.data || refreshError
        );
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Reject other errors
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Access denied:", error.response.data);
      const refreshToken = Cookies.get("refresh_token");
      if (refreshToken && isTokenExpired(refreshToken)) {
        console.error("Refresh token expired. Redirecting to login.");
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("athAIna_csrfToken");
        router.push({ name: "Login" });
      } else {
        console.error("Access denied:", error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
