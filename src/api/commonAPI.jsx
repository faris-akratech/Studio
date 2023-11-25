import createAxiosInstance from "../services/axiosInterceptor";
import { ORG_SERVER } from "../services/constants";
import { SCHEMA_SERVER } from "../services/constants";

const axiosSchemaInstance = createAxiosInstance(SCHEMA_SERVER);
const axiosOrgInstance = createAxiosInstance(ORG_SERVER);
