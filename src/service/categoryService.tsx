import axios from "axios";
const REST_API_BASE_URL: string = "http://localhost:8080/categories";
export const getAllCategories = () => axios.get(REST_API_BASE_URL);
export const deleteCategory = (id: any) =>
  axios.delete(REST_API_BASE_URL + "/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
export const getCategory = (id: any) =>
  axios.get(REST_API_BASE_URL + "/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
export const getCategoryName = (name: any) =>
  axios.get(REST_API_BASE_URL + "/ten/" + name, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
export const createCategory = (data: any) =>
  axios.post(REST_API_BASE_URL, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
export const createCategoryList = (data: any) =>
  axios.post(REST_API_BASE_URL + "/list", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
export const updateCategory = (id: any, data: any) =>
  axios.put(REST_API_BASE_URL + "/" + id, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
