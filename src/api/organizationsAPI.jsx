import createAxiosInstance from "../services/axiosInterceptor";
import { ORG_SERVER } from "../services/constants";

const axiosInstance = createAxiosInstance(ORG_SERVER);

export const getAllOrganizations = async () => {
  try {
    const response = await axiosInstance.get("/getAllOrgs", {
      headers: {
        needsToken: true,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const createNewOrganization = async (data) => {
  try {
    const response = await axiosInstance.post("/", data, {
      headers: {
        needsToken: true,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
