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
import { getAllProduct } from "../../../service/ProductService";
import { useEffect, useState } from "react";
import ImageProductThaoTac from "./saveOrEdit";
import { Image } from "primereact/image";
import { useRouter } from "next/navigation";
import {
  createImageProduct,
  deleteImageProduct,
  getAllImageProduct,
  updateImageProduct,
} from "../../../service/imageService";

const ImageProduct = () => {
  const [products, setProduct] = useState<IImage[]>([]);
  const [renderData, setRenderData] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [dataProduct, setDataProduct] = useState<IProduct[]>([]);
  const [filebase64, setFileBase64] = useState<string>("");
  const router = useRouter();
  const [productDialog, setProductDialog] = useState<
    AddOrUpdate<Partial<IImage>>
  >({ visible: false, header: "", defaultValues: {} });
  const [data, setData] = useState<IImage>();
  const [giatri, setGiatri] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  useEffect(() => {
    if (localStorage.getItem("access") === null) {
      return router.push("/account/login");
    }

    setLoading(true);
    getAllImageProduct()
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
    getAllProduct()
      .then((res) => setDataProduct(res.data))
      .catch((err) => console.log(err));
    setLoading(false);
  }, [renderData]);
  const handleDelete = () => {
    setLoading(true);
    deleteImageProduct(data?.imageId)
      .then((res) => {
        if ((res.data = "thanh cong")) {
          setVisible(false);
          mutate("http://localhost:8080/images");
          setRenderData(!renderData);
          setProduct([...products]);
          toast.success("Xóa thành công");
        } else {
          toast.error("Xóa không thành công");
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteBodyTemplate = (rowData: IImage) => {
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
  const updateBodyTemplate = (rowData: IImage) => {
    return (
      <>
        <Button
          label="Chỉnh sửa"
          onClick={() => {
            setProductDialog({
              header: "Chỉnh sửa ảnh sản phẩm",
              visible: true,
              defaultValues: { ...rowData },
            });
          }}
          className="bg-[#06B6D4] text-[#fff] w-[100%]"
        />
      </>
    );
  };
  const productBody = (rowData: IImage) => {
    let product: IProduct | undefined = dataProduct.find(
      (item) => item.productId === rowData.productId
    );
    return <p>{product?.name}</p>;
  };
  const imageBody = (rowData: IImage) => {
    return (
      <>
        <Image
          src={`http://localhost:8080/images/imagesUpload/${rowData.imageProduct}`}
          width="150"
          alt="image-product"
        />
      </>
    );
  };
  const callbackEditProduct = (data: any) => {
    const formData = new FormData();
    formData.append("file", data["file1"]["0"]);
    setLoading(true);
    updateImageProduct(data["imageId"], formData).then((res) => {
      if (res) {
        setRenderData(!renderData);
        setProduct([...products]);
        setProductDialog({
          header: "",
          visible: false,
          defaultValues: {},
        });
        setFileBase64("");
        mutate("http://localhost:8080/images");
        toast.success("Chỉnh sửa ảnh sản phẩm thành công !");
      } else {
        toast.error("Không thành công !");
      }
      setLoading(false);
    });
  };
  const handleCallbackAddData = (data: any) => {
    const formData = new FormData();
    formData.append("file", data["file1"]["0"]);

    setLoading(true);
    createImageProduct(data["productId"], formData)
      .then((res) => {
        if (res) {
          console.log(res.data);
          setRenderData(!renderData);
          setProduct([...products]);
          setProductDialog({
            header: "",
            visible: false,
            defaultValues: {},
          });
          mutate("http://localhost:8080/images");
          toast.success("Thêm mới ảnh sản phẩm thành công !");
        } else {
          toast.error("Không thành công !");
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
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
            placeholder=""
            className="w-full h-full border-1"
          />
        </span>
        <Button
          label="Thêm mới"
          className="w-[130px] h-[40px] text-[#fff] bg-[#475569]"
          onClick={() => {
            setFileBase64("");
            setProductDialog({
              header: "Thêm mới ảnh sản phẩm",
              visible: true,
              defaultValues: {},
            });
          }}
        />
      </div>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <DataTable
            filters={giatri}
            value={products?.sort(
              (a: any, b: any) => b["imageId"] - a["imageId"]
            )}
            tableStyle={{ minWidth: "50rem" }}
            paginator
            currentPageReportTemplate={
              "Hiển thị {first} đến {last} trong số {totalRecords} bản ghi"
            }
            rows={2}
            rowsPerPageOptions={[2, 4, 5]}
            className="datatable-responsive mt-2"
            responsiveLayout="scroll"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          >
            <Column
              field="productId"
              style={{ minWidth: "9rem" }}
              header="Tên sản phẩm"
              body={productBody}
            ></Column>
            <Column
              style={{ minWidth: "11rem" }}
              header="Ảnh sản phẩm"
              body={imageBody}
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
      <ImageProductThaoTac
        filebase64={filebase64}
        setFileBase64={setFileBase64}
        dataProduct={dataProduct}
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
          productDialog.header === "Chỉnh sửa ảnh sản phẩm"
            ? callbackEditProduct
            : handleCallbackAddData
        }
      />
    </div>
  );
};
export default ImageProduct;
