"use client";
import { getAllCartShowFalse } from "@/service/serviceCart/service";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

type FormData = {
  name: string;
  email: string;
  number: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  total: string;
  username: string | null;
};
const AdminCart = () => {
  const [dataDetail, setDetail] = useState<FormData[]>([]);
  const [dataCart, setCart] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [giatri, setGiatri] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/details")
      .then((res: any) => {
        setDetail(res.data);

        getAllCartShowFalse()
          .then((res: any) => {
            setCart(res.data);
          })
          .catch((err) => console.log(err));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const DetailBody = (rowData: any) => {
    let data: any = dataCart.filter(
      (item: any) => item["detail"]["detailId"] === rowData["detailId"]
    );
    return data.map((item: any) => (
      <h2 className="">
        {" "}
        <i className="pi pi-circle-fill text-[red] text-[10px] opacity-[0.7]"></i>
        {item["product"]["name"]}-số lượng:{item["quantity"]}-size:
        {item["size"]}
      </h2>
    ));
  };
  const TotalBody = (rowData: any) => {
    return <h2>{rowData["total"]} VND</h2>;
  };
  const addressBody = (rowData: any) => {
    return (
      <h2>
        {rowData["city"]}/{rowData["district"]}/{rowData["ward"]}-
        {rowData["address"]}
      </h2>
    );
  };
  return (
    <>
      {" "}
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div className="flex justify-between h-2rem">
            <span className="p-input-icon-right w-[30%]">
              <i className="pi pi-spin pi-spinner" />
              <InputText
                onChange={(e) =>
                  setGiatri({
                    ...giatri,
                    global: {
                      value: e.target.value,
                      matchMode: FilterMatchMode.CONTAINS,
                    },
                  })
                }
                id="name"
                placeholder="  name"
                className="w-full h-full border-1"
              />
            </span>
          </div>
          <DataTable
            filters={giatri}
            value={dataDetail}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            currentPageReportTemplate={
              "Hiển thị {first} đến {last} trong số {totalRecords} bản ghi"
            }
            rows={4}
            rowsPerPageOptions={[2, 4, 5]}
            className="datatable-responsive mt-2"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          >
            <Column
              style={{ minWidth: "12rem" }}
              field="name"
              header="Tên khách hàng"
            ></Column>
            <Column field="email" header="Email"></Column>
            <Column
              field="number"
              style={{ minWidth: "10rem" }}
              header="Số điện thoại"
            ></Column>
            <Column
              style={{ minWidth: "13rem" }}
              body={addressBody}
              header="Địa chỉ"
            ></Column>
            <Column
              style={{ minWidth: "14rem" }}
              body={DetailBody}
              header="Chi tiết đơn hàng"
            ></Column>
            <Column
              style={{ minWidth: "10rem" }}
              body={TotalBody}
              header="Tổng tiền"
            ></Column>
          </DataTable>
        </>
      )}
    </>
  );
};
export default AdminCart;
