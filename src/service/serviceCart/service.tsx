import axios from "axios";
const REST_API_BASE_URL: string = "http://localhost:8080/carts";
export const postCart = (size: string, data: any) =>
  axios.post(REST_API_BASE_URL + "/" + size, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
export const postCartUser = (
  size: string,
  data: any,
  quantity: number,
  username: string | null
) =>
  axios.post(
    REST_API_BASE_URL + "/" + size + "/" + quantity + "/" + username,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + localStorage.getItem("access"),
      },
    }
  );
export const postCartAndNumber = (size: string, data: any, quantity: number) =>
  axios.post(REST_API_BASE_URL + "/" + size + "/" + quantity, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
export const getAllCart = (username: string | null) =>
  axios.get(REST_API_BASE_URL + "/" + username);
export const getAllCartShow = (username: string | null) =>
  axios.get(REST_API_BASE_URL + "/admin/" + username);
export const getAllCartShowFalse = () =>
  axios.get(REST_API_BASE_URL + "/adminShow");
export const getAllCartIdShowFalse = (id: number) =>
  axios.get(REST_API_BASE_URL + "/cartIdShow/" + id);
export const deleteCart = (id: number) =>
  axios.delete(REST_API_BASE_URL + "/" + id);
