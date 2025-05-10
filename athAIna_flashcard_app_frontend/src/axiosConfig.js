import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";

const router = useRouter();

const axiosInstance = axios.create({
  baseURL: "https://athaina.software",
  withCredentials: true, // Always send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to ensure cookies are always sent
axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true; // Ensure this is set for every request
    return config;
  },
  (error) => Promise.reject(error)
);

// Single response interceptor handling both token refresh and authentication errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (!originalRequest) return Promise.reject(error);

    // console.log("API Error:", error.response?.status, error.response?.data);

    // Handle 401 Unauthorized errors
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // Mark this request as retried to prevent loops
      originalRequest._retry = true;

      // Skip token refresh for login/refresh token endpoints to prevent loops
      if (
        originalRequest.url?.includes("login") ||
        originalRequest.url?.includes("token/refresh")
      ) {
        // console.log("Not attempting refresh for auth endpoints");
        return Promise.reject(error);
      }

      try {
        // console.log("Attempting token refresh...");
        const refreshResponse = await axiosInstance.post(
          "/account/token/refresh/",
          {}, // Empty body
          {
            withCredentials: true,
            _retry: true, // Mark to prevent loops
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // console.log("Token refresh successful");

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // console.error("Token refresh failed:", refreshError.message);

        // Clear session storage
        sessionStorage.removeItem("session");

        // Check if we're already on the login page to prevent redirect loops
        if (window.location.pathname !== "/login") {
          // console.log("Redirecting to login after auth failure");
          // Use history mode navigation to avoid page reload
          router.push({ name: "Login" });
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // console.error("Access denied:", error.response.data);
        if (
          error.response.data.error === "Refresh token is expired or invalid"
        ) {
          // console.error(
          //   "Refresh token expired or invalid. Redirecting to login."
          // );
        
          router.push({ name: "Login" });
        }
      }
    }

    return Promise.reject(error); 
  }
);

export default axiosInstance;
