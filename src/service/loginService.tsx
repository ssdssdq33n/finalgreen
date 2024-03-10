import axios from "axios";
const REST_API_BASE_URL: string = "http://localhost:8080";
export const loginUser = (data: any) =>
  axios.post(REST_API_BASE_URL + "/login", data);
export const guiXacThucEmail = (data: any) =>
  axios.post(REST_API_BASE_URL + "/xacthuc", data);
export const khoiphucUser = (data: any) =>
  axios.post(REST_API_BASE_URL + "/khoiphuc", data);
