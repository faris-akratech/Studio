import axios from "axios";

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json', // Set the desired content type here
      // Add any other headers you want to include for all requests
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
