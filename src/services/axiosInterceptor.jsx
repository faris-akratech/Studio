import axios from "axios";

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const token = localStorage.getItem("access");
  const iv = localStorage.getItem("value");

  // Add an interceptor to set the token for specific requests
  instance.interceptors.request.use(
    (config) => {
      // Check if the request needs a token
      if (config.headers.needsToken) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.value = iv;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;
