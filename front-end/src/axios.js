import axios from "axios";

// Normalize the server hostname so trailing slashes don't cause "//" in URLs
const RAW_SERVER = process.env.REACT_APP_SERVER_HOSTNAME || "";
export const SERVER_HOST = RAW_SERVER.replace(/\/+$/, "");

export const axiosInstance = axios.create({
  baseURL: `${SERVER_HOST}/api`,
  withCredentials: true,
});
