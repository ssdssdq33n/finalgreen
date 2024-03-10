"use client";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import Loading from "./loading";
import { ToastContainer, toast } from "react-toastify";
import { mutate } from "swr";

import {
  createProduct,
  createProductImport,
  deleteProduct,
  getAllProduct,
  nodeService,
  updateProduct,
} from "../../../service/ProductService";
import { useEffect, useState } from "react";
import ProductThaoTac from "./saveOrEdit";
import { getAllCategories } from "../../../service/categoryService";

import { useRouter } from "next/navigation";
import { exportExcelFileExcel } from "../excel";
import { excelType } from "../contant";
import { FileUpload } from "primereact/fileupload";
import { ExcelRenderer } from "react-excel-renderer";
import { getAllCartIdShowFalse } from "@/service/serviceCart/service";

const Products = () => {
  const [products, setProduct] = useState<IProduct[]>([]);
  const [renderData, setRenderData] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [dataSize, setSize] = useState<ISize[]>([]);
  const [dataCate, setCate] = useState<ICategory[]>([]);
  const [showImport, setShowImport] = useState<boolean>(false);
  const [dataImport, setDataImport] = useState<any>([]);

  const [productDialog, setProductDialog] = useState<
    AddOrUpdate<Partial<IProduct>>
  >({ visible: false, header: "", defaultValues: {} });
  const [data, setData] = useState<IProduct>();
  const [quantityED, setQuantityED] = useState<number | undefined>(0);
  const router = useRouter();
  const [giatri, setGiatri] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  useEffect(() => {
    if (localStorage.getItem("access") === null) {
      return router.push("/account/login");
    }

    setLoading(true);
    getAllCategories()
      .then((res) => {
        if (res) {
          setLoading(false);
          setCate(res.data);
        }
      })
      .catch((err) => console.log(err));
    setLoading(true);
    getAllProduct()
      .then((res) => {
        if (res) {
          setProduct(res.data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
    setSize(nodeService.getDataSize());
  }, [renderData]);
  const handleDelete = () => {
    deleteProduct(data?.productId)
      .then((res) => {
        if ((res.data = "thanh cong")) {
          setVisible(false);
          mutate("http://localhost:8080/products");
          setRenderData(!renderData);
          setProduct([...products]);
          toast.success("Xóa thành công");
        } else {
          toast.error("Xóa không thành công");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Không thể xóa sản phẩm này");
        setVisible(false);
      });
  };

  const cateBody = (rowData: IProduct) => {
    let data = dataCate.find((item) => item.categoryId === rowData.categoryId);
    return <p>{data?.name}</p>;
  };
  const saleBody = (rowData: IProduct) => {
    return <p>{rowData?.sale} %</p>;
  };
  const priceBody = (rowData: IProduct) => {
    return <p>{rowData?.price} đ</p>;
  };
  const deleteBodyTemplate = (rowData: IProduct) => {
    return (
      <>
        <Button
          label="Xóa"
          onClick={() => {
            setVisible(true);
            setData(rowData);
          }}
          className="bg-[#DC2626] text-[#fff] w-[100%]"
        />
      </>
    );
  };
  const updateBodyTemplate = (rowData: IProduct) => {
    return (
      <>
        <Button
          label="Chỉnh sửa"
          onClick={() => {
            setProductDialog({
              header: "Chỉnh sửa sản phẩm",
              visible: true,
              defaultValues: { ...rowData },
            });
          }}
          className="bg-[#06B6D4] text-[#fff] w-[100%]"
        />
      </>
    );
  };

  const callbackEditProduct = (data: IProduct) => {
    setLoading(true);
    updateProduct(data.productId, data).then((res) => {
      if (res) {
        setRenderData(!renderData);
        setProduct([...products]);
        setProductDialog({
          header: "",
          visible: false,
          defaultValues: {},
        });
        setLoading(false);
        mutate("http://localhost:8080/products");
        toast.success("Chỉnh sửa sản phẩm thành công !");
      } else {
        toast.error("Không thành công !");
      }
    });
  };
  const handleCallbackAddData = (data: IProduct) => {
    setLoading(true);
    createProduct(data)
      .then((res) => {
        if (res.data === "ton tai") {
          setProductDialog({
            header: "",
            visible: false,
            defaultValues: {},
          });
          setLoading(false);
          toast.error("Sản phẩm đã tồn tại !");
        } else if (res.data !== "ton tai") {
          setRenderData(!renderData);
          setProduct([...products]);
          setProductDialog({
            header: "",
            visible: false,
            defaultValues: {},
          });
          setLoading(false);
          mutate("http://localhost:8080/products");
          toast.success("Thêm mới sản phẩm thành công !");
        } else {
          toast.error("Không thành công !");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Không thành công !");
      });
  };
  const headerProduct = [
    "STT",
    "Tên sản phẩm",
    "Sale",
    "Giá tiền",
    "Số lượng còn",
    "Loại sản phẩm",
    "Nội dung",
  ];
  const title = "Danh sách sản phẩm";
  let fileUploaderRef: any = null;
  const showErrorFile = () => {
    toast.error("Không đúng định dạng .xlsx,xls hoặc sản phẩm");
    fileUploaderRef.clear();
  };
  const importExcelFile = (event: any) => {
    if (event && event.files && event.files[0]) {
      let file = event.files[0];
      if (
        file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        showErrorFile();
        return;
      } else {
        ExcelRenderer(event.files[0], (err: any, resp: any) => {
          if (err) {
            showErrorFile();
            return;
          } else {
            const { rows } = resp;
            let resultList: any = [];
            console.log(rows);
            if (rows.length > 500) {
              showErrorFile();
              return;
            } else {
              rows.map((item: any, index: number) => {
                if (index == 2) {
                  if (
                    item[0].indexOf("STT") == "-1" ||
                    item[1].indexOf("Tên sản phẩm") == "-1" ||
                    item[2].indexOf("Sale") == "-1" ||
                    item[3].indexOf("Giá tiền") == "-1" ||
                    item[4].indexOf("Số lượng còn") == "-1" ||
                    item[5].indexOf("Loại sản phẩm") == "-1" ||
                    item[6].indexOf("Nội dung") == "-1"
                  ) {
                    return showErrorFile();
                  }
                }
                if (
                  index > 2 &&
                  typeof item[0] === "number" &&
                  item[1] &&
                  item[2] &&
                  item[3] &&
                  item[4] &&
                  item[5] &&
                  item[6]
                ) {
                  let obj = {
                    name: item[1],
                    sale: item[2],
                    price: item[3],
                    quantity: item[4],
                    category: item[5],
                    decription: item[6],
                  };
                  resultList.push(obj);
                }
              });

              if (resultList.length > 0) {
                setDataImport(resultList);
                setShowImport(true);
              }
            }
          }
        });
      }
    } else {
      showErrorFile();
    }
  };
  const bodyStatus = (rowData: any) => {
    let dataFind = products.find(
      (item: any) => item["name"] === rowData["name"]
    );
    let dataFindImport = dataImport.filter(
      (item: any) => item["name"] === rowData["name"]
    );
    if (dataFind) {
      return (
        <h2 className="text-[red] opacity-[0.7]">Đã tồn tại trên hệ thống</h2>
      );
    }
    if (dataFindImport?.length > 1) {
      return (
        <h2 className="text-[red] opacity-[0.7]">
          Trùng với dữ liệu trong bảng
        </h2>
      );
    }
    if (dataFindImport?.length === 1 && !dataFind) {
      return <h2 className="text-[#02D58A]">Thành công !</h2>;
    }
  };
  const handleSaveDate = () => {
    let arr: any = [];
    dataImport.map((rowData: any) => {
      let dataFind = products.find(
        (item: any) => item["name"] === rowData["name"]
      );
      let dataFindImport = dataImport.filter(
        (item: any) => item["name"] === rowData["name"]
      );
      if (!dataFind && dataFindImport?.length === 1) {
        arr.push(rowData);
      }
    });

    if (arr?.length > 0) {
      createProductImport(arr)
        .then((res) => {
          if (res) {
            setShowImport(false);
            setRenderData(!renderData);
            fileUploaderRef.clear();
            toast.success("Lưu thành công");
          }
        })
        .catch((err) => {
          setShowImport(false);
          console.log(err);
          toast.error("Lưu không thành công");
        });
    } else {
      setShowImport(false);
      toast.error("Không có sản phẩm nào được lưu");
      fileUploaderRef.clear();
    }
  };

  return (
    <div className="h-full">
      <ToastContainer />

      <div className="flex justify-between">
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
            placeholder="   name"
            className="w-full h-full border-1"
          />
        </span>
        <div className="flex align-items-center">
          <FileUpload
            ref={(ref) => {
              fileUploaderRef = ref;
            }}
            className="w-[130px] h-[40px] text-[#fff] mr-2"
            mode="basic"
            name="demo[]"
            chooseLabel="Import"
            url="/api/upload"
            accept=".xls, .xlsx"
            maxFileSize={1000000}
            onSelect={(e) => importExcelFile(e)}
          />
          <Button
            label="Export"
            className="w-[130px] h-[40px] text-[#fff] bg-[#BE912D] mr-2"
            onClick={() => {
              exportExcelFileExcel(
                title,
                "Products",
                headerProduct,
                excelType.Product,
                products,
                dataCate
              );
            }}
          />
          <Button
            label="Thêm mới"
            className="w-[130px] h-[40px] text-[#fff] bg-[#475569]"
            onClick={() => {
              setProductDialog({
                header: "Thêm mới sản phẩm",
                visible: true,
                defaultValues: {},
              });
            }}
          />
        </div>
      </div>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <DataTable
            filters={giatri}
            value={products?.sort(
              (a: IProduct, b: IProduct) => b["productId"] - a["productId"]
            )}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            currentPageReportTemplate={
              "Hiển thị {first} đến {last} trong số {totalRecords} bản ghi"
            }
            rows={4}
            rowsPerPageOptions={[2, 4, 5]}
            className="datatable-responsive mt-2"
            responsiveLayout="scroll"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          >
            <Column
              field="name"
              style={{ minWidth: "9rem" }}
              header="Tên sản phẩm"
            ></Column>

            <Column
              style={{ minWidth: "9rem" }}
              field="sale"
              header="Giá giảm (%)"
              body={saleBody}
            ></Column>
            <Column
              style={{ minWidth: "13rem" }}
              field="price"
              header="Giá sản phẩm (VND)"
              body={priceBody}
            ></Column>
            <Column
              style={{ minWidth: "10rem" }}
              field="quantity"
              header="Số lượng còn"
            ></Column>
            <Column
              style={{ minWidth: "11rem" }}
              field="categoryId"
              body={cateBody}
              header="Loại sản phẩm"
            ></Column>
            <Column
              style={{ minWidth: "6rem" }}
              body={deleteBodyTemplate}
            ></Column>
            <Column
              style={{ minWidth: "9rem" }}
              body={updateBodyTemplate}
            ></Column>
          </DataTable>
        </>
      )}
      <Dialog
        header="Bạn có chắc chắn muốn xóa"
        visible={visible}
        style={{ width: "27vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="flex justify-around">
          <Button
            className="text-[#fff] bg-[#0891B2] w-[25%]"
            onClick={handleDelete}
            label="Có"
          />
          <Button
            className=" text-[#fff] bg-[#475569] w-[25%]"
            onClick={() => setVisible(false)}
            label="Không"
          />
        </div>
      </Dialog>
      <Dialog
        visible={showImport}
        style={{ width: "50vw" }}
        onHide={() => setShowImport(false)}
      >
        <>
          <div>
            <DataTable value={dataImport} tableStyle={{ minWidth: "50rem" }}>
              <Column field="name" header="Tên sản phẩm"></Column>
              <Column field="sale" header="Sale"></Column>
              <Column field="price" header="Giá tiền"></Column>
              <Column field="quantity" header="Số lượng còn"></Column>
              <Column field="category" header="Loại sản phẩm"></Column>
              <Column field="decription" header="Nội dung"></Column>
              <Column body={bodyStatus} header="Trạng thái"></Column>
            </DataTable>
          </div>
          <div className="flex justify-around mt-3">
            <Button
              className="text-[#fff] bg-[#0891B2] w-[25%]"
              onClick={handleSaveDate}
              label="Lưu"
            />
            <Button
              className=" text-[#fff] bg-[#475569] w-[25%]"
              onClick={() => {
                setShowImport(false);
                fileUploaderRef.clear();
              }}
              label="Không"
            />
          </div>
        </>
      </Dialog>
      <ProductThaoTac
        dataCate={dataCate}
        dataSize={dataSize}
        visible={productDialog.visible}
        header={productDialog.header}
        defaultValues={productDialog.defaultValues}
        close={() =>
          setProductDialog({
            ...productDialog,
            visible: false,
            defaultValues: {},
          })
        }
        onSubmit={
          productDialog.header === "Chỉnh sửa sản phẩm"
            ? callbackEditProduct
            : handleCallbackAddData
        }
      />
    </div>
  );
};
export default Products;
