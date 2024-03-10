import axios from "axios";
const REST_API_BASE_URL: string = "http://localhost:8080";
export const getAllUser = () =>
  axios.get(REST_API_BASE_URL + "/users", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
export const deleteUser = (id: any) =>
  axios.delete(REST_API_BASE_URL + "/deleteUser/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
