import createAxiosInstance from "../services/axiosInterceptor";
import { USER_SERVER } from "../services/constants";

const axiosInstance = createAxiosInstance(USER_SERVER);

export const getAllUsers = async (id) => {
    try {
      const response = await axiosInstance.get(`/`, {
        headers: {
          needsToken: true,
        },
      });
      return response;
    } catch (err) {
      return err;
    }
  };
