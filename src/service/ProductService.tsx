import axios from "axios";
const REST_API_BASE_URL: string = "http://localhost:8080/products";
export const getAllProduct = () => axios.get(REST_API_BASE_URL);
export const deleteProduct = (id: any) =>
  axios.delete(REST_API_BASE_URL + "/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
export const getProductPage = (page: number, row: number) =>
  axios.get(REST_API_BASE_URL + `/listPagi?page=${page}&rows=${row}`);
export const getProductKeyword = (key: string, size: string) =>
  axios.get(REST_API_BASE_URL + `/keyword?key=${key}&size=${size}`);
export const getProductKeywordPagi = (
  key: string,
  size: string,
  page: number,
  row: number
) =>
  axios.get(
    REST_API_BASE_URL +
      `/keyword?key=${key}&size=${size}&page=${page}&rows=${row}`
  );
export const getProductKeywordPagiPrice = (
  key: string,
  size: string,
  page: number,
  row: number,
  priceMore: number | string,
  priceLess: number | string,
  cateName: string
) =>
  axios.get(
    REST_API_BASE_URL +
      `/keyword?key=${key}&size=${size}&page=${page}&rows=${row}&priceMore=${priceMore}&priceLess=${priceLess}&categoryName=${cateName}`
  );
export const getProduct = (id: any) =>
  axios.get(REST_API_BASE_URL + "/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
export const createProduct = (data: any) =>
  axios.post(REST_API_BASE_URL, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
export const createProductImport = (data: any) =>
  axios.post(REST_API_BASE_URL + "/list", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });
export const updateProduct = (id: any, data: any) =>
  axios.put(REST_API_BASE_URL + "/" + id, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + localStorage.getItem("access"),
    },
  });

export const nodeService = {
  getDataSize() {
    return [
      {
        key: "1",
        value: "S",
      },
      {
        key: "2",
        value: "M",
      },
      {
        key: "3",
        value: "L",
      },
      {
        key: "4",
        value: "XL",
      },
      {
        key: "5",
        value: "XXL",
      },
    ];
  },
};
