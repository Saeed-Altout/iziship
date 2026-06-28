import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const locale = window.location.pathname.startsWith("/ar") ? "ar" : "en";
    config.headers["Accept-Language"] = locale;
  }
  return config;
});

export default apiClient;
