"use client";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import Loading from "./loading";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  createCategory,
  createCategoryList,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../../../service/categoryService";
import { mutate } from "swr";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { useRouter } from "next/navigation";
import CategoryThaoTac from "./saveOrEdit";
import { exportExcelFileExcel } from "../excel";
import { excelType } from "../contant";
import { FileUpload } from "primereact/fileupload";
import { ExcelRenderer } from "react-excel-renderer";
import "./cate.css";

const Categories = () => {
  const [products, setProduct] = useState<ICategory[]>([]);
  const [renderData, setRenderData] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();
  const [productDialog, setProductDialog] = useState<
    AddOrUpdate<Partial<ICategory>>
  >({ visible: false, header: "", defaultValues: {} });
  const [data, setData] = useState<ICategory>();
  const [dataExport, setExport] = useState<any>([]);
  const [dataImport, setDataImport] = useState<any>([]);
  const [showImport, setShowImport] = useState<boolean>(false);
  const [giatri, setGiatri] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [renderData]);
  const handleDelete = () => {
    deleteCategory(data?.categoryId)
      .then((res) => {
        if ((res.data = "thanh cong")) {
          setVisible(false);
          mutate("http://localhost:8080/categories");
          setRenderData(!renderData);
          setProduct([...products]);
          toast.success("Xóa thành công");
        } else {
          toast.error("Xóa không thành công");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Không thể xóa loại sản phẩm này");
        setVisible(false);
      });
  };
  const deleteBodyTemplate = (rowData: ICategory) => {
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
  const updateBodyTemplate = (rowData: ICategory) => {
    return (
      <>
        <Button
          label="Chỉnh sửa"
          onClick={() => {
            setProductDialog({
              header: "Chỉnh sửa loại sản phẩm",
              visible: true,
              defaultValues: { ...rowData },
            });
          }}
          className="bg-[#06B6D4] text-[#fff] w-[100%]"
        />
      </>
    );
  };
  const callbackEditProduct = (data: ICategory) => {
    setLoading(true);
    updateCategory(data.categoryId, data).then((res) => {
      if (res) {
        setRenderData(!renderData);
        setProduct([...products]);
        setProductDialog({
          header: "",
          visible: false,
          defaultValues: {},
        });
        mutate("http://localhost:8080/categories");
        toast.success("Chỉnh sửa loại sản phẩm thành công !");
      } else {
        toast.error("Không thành công !");
      }
    });
  };
  const handleCallbackAddData = (data: ICategory) => {
    setLoading(true);
    createCategory(data)
      .then((res) => {
        if (res.data === "ton tai") {
          setProductDialog({
            header: "",
            visible: false,
            defaultValues: {},
          });
          setLoading(false);
          toast.error("Loại sản phẩm đã tồn tại !");
        } else if (res.data !== "ton tai") {
          setRenderData(!renderData);
          setProduct([...products]);
          setProductDialog({
            header: "",
            visible: false,
            defaultValues: {},
          });
          setLoading(false);
          mutate("http://localhost:8080/categories");
          toast.success("Thêm mới loại sản phẩm thành công !");
        } else {
          toast.error("Không thành công !");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Thêm mới loại sản phẩm không thành công");
      });
  };

  const headerCate = ["STT", "Tên loại sản phẩm"];
  const title = "Danh sách loại sản phẩm";
  let fileUploaderRef: any = null;
  const showErrorFile = () => {
    toast.error("Không đúng định dạng .xlsx,xls hoặc loại sản phẩm");
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

            if (rows.length > 500) {
              showErrorFile();
              return;
            } else {
              rows.map((item: any, index: number) => {
                if (index == 2) {
                  if (
                    item[0].indexOf("STT") == "-1" ||
                    item[1].indexOf("Tên loại sản phẩm") == "-1"
                  ) {
                    return showErrorFile();
                  }
                }
                if (index > 2 && typeof item[0] === "number" && !item[2]) {
                  let obj = {
                    name: item[1],
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
      createCategoryList(arr)
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
      toast.error("Không có loại sản phẩm nào được lưu");
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
            placeholder="  name"
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
                "Categories",
                headerCate,
                excelType.Category,
                products,
                null
              );
            }}
          />
          <Button
            label="Thêm mới"
            className="w-[130px] h-[40px] text-[#fff] bg-[#475569]"
            onClick={() => {
              setProductDialog({
                header: "Thêm mới loại sản phẩm",
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
              (a: any, b: any) => b["categoryId"] - a["categoryId"]
            )}
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
            <Column field="name" header="Name"></Column>
            <Column className="w-[110px]" body={deleteBodyTemplate}></Column>
            <Column className="w-[145px]" body={updateBodyTemplate}></Column>
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
            <DataTable value={dataImport} tableStyle={{ minWidth: "20rem" }}>
              <Column field="name" header="Tên loại sản phẩm"></Column>
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
      <CategoryThaoTac
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
          productDialog.header === "Chỉnh sửa loại sản phẩm"
            ? callbackEditProduct
            : handleCallbackAddData
        }
      />
    </div>
  );
};
export default Categories;
