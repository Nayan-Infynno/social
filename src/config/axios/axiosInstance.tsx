import axios from "axios";
import { toast } from "sonner-native";

const axiosInstance = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_BASE_URL ||
    "https://jsonplaceholder.typicode.com",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
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
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error("Your session has expired. Please log in again.");
          break;
        case 403:
          toast.error(
            "Access denied. You don't have permission to access this resource."
          );
          break;
        case 500:
          toast.error(
            "Something went wrong on our end. Please try again later."
          );
          break;
        default:
          toast.error(
            error.message || "An unexpected error occurred! Please try again."
          );
          break;
      }
    }
    if (!error.response) {
      toast.error(
        "Unable to connect to the server. Please check your internet connection and try again."
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
