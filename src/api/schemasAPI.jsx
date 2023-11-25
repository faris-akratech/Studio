import createAxiosInstance from "../services/axiosInterceptor";
import { SCHEMA_SERVER } from "../services/constants";

const axiosInstance = createAxiosInstance(SCHEMA_SERVER);

export const getAllSchemas = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`, {
      headers: {
        needsToken: true,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const createNewSchema = async (data, id) => {
  try {
    const response = await axiosInstance.post(`/${id}`, data, {
      headers: {
        needsToken: true,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const getSpecificSchema = async (name, orgId) => {
  try {
    const response = await axiosInstance.get(`/${name}/${orgId}`, {
      headers: {
        needsToken: true,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
