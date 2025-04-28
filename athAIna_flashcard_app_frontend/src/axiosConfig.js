import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";

const router = useRouter();

const axiosInstance = axios.create({
  baseURL: "https://athaina.software",
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
          "https://athaina.software/account/token/refresh/",
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
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Access denied:", error.response.data);
        if (
          error.response.data.error === "Refresh token is expired or invalid" 
        ) {
          console.error("Refresh token expired or invalid. Redirecting to login.");
          // Cookies.remove("access_token"); // Clear access token
          // Cookies.remove("refresh_token"); // Clear refresh token
          router.push({ name: "Login" }); // Redirect to login page
        }
      }
    }

    return Promise.reject(error); // Reject other errors
  }
);

export default axiosInstance;
