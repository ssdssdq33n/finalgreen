"use client";
import { Image } from "primereact/image";
import img from "./images/aothunnam.webp";
import Loading from "./loading";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import { getAllImageProduct } from "@/service/imageService";
import { useRouter } from "next/navigation";
import { Paginator } from "primereact/paginator";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { Galleria } from "primereact/galleria";
import { RadioButton } from "primereact/radiobutton";
import {
  getProductKeywordPagi,
  getProductKeywordPagiPrice,
  nodeService,
} from "@/service/ProductService";
import { mutate } from "swr";
import { postCartUser } from "../../service/serviceCart/service";
import { ToastContainer, toast } from "react-toastify";
import "./content.css";

import { LayoutContext } from "../Component/Component";
const Content = (props: any) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [imageProduct, setImage] = useState<IImage[]>([]);
  const [dataItem, setItem] = useState<IProduct>();
  const [dataSize, setSize] = useState<ISize[]>([]);
  const [value, setValue] = useState<number>(1);
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(4);
  const [products, setProduct] = useState<IProduct[]>([]);
  const context = useContext(LayoutContext);
  const { renderData, setRenderData } = context;
  const [selectedSize, setSelectedSize] = useState<ISize>({
    key: "1",
    value: "S",
  });
  const router = useRouter();
  const { valueData, dataPrice, dataPriceCate } = props;
  useEffect(() => {
    setSize(nodeService.getDataSize());
    getAllImageProduct()
      .then((res) => {
        if (res) {
          setLoading(false);

          setImage(res.data);
        }
      })
      .catch((err) => console.log(err));
    getProductKeywordPagi(valueData, "more", first, rows)
      .then((res) => {
        setProduct(res.data["content"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [first, rows]);
  useEffect(() => {
    if (dataPrice?.length === 0) {
      return;
    }
    if (dataPriceCate?.length === 0) {
      if (dataPrice[0] === "less") {
        getProductKeywordPagiPrice(
          valueData,
          "more",
          first,
          rows,
          "%20",
          dataPrice[1],
          "%20"
        )
          .then((res) => {
            setProduct(res.data["content"]);
          })
          .catch((err) => console.log(err));
      } else if (dataPrice[0] === "more") {
        getProductKeywordPagiPrice(
          valueData,
          "more",
          first,
          rows,
          dataPrice[1],
          "%20",
          "%20"
        )
          .then((res) => {
            setProduct(res.data["content"]);
          })
          .catch((err) => console.log(err));
      } else if (
        typeof dataPrice[0] === "number" &&
        typeof dataPrice[1] === "number"
      ) {
        getProductKeywordPagiPrice(
          valueData,
          "more",
          first,
          rows,
          dataPrice[0],
          dataPrice[1],
          "%20"
        )
          .then((res) => {
            setProduct(res.data["content"]);
          })
          .catch((err) => console.log(err));
      }
    } else {
      if (dataPrice[0] === "less") {
        getProductKeywordPagiPrice(
          "%20",
          "more",
          first,
          rows,
          "%20",
          dataPrice[1],
          dataPriceCate
        )
          .then((res) => {
            setProduct(res.data["content"]);
          })
          .catch((err) => console.log(err));
      } else if (dataPrice[0] === "more") {
        getProductKeywordPagiPrice(
          "%20",
          "more",
          first,
          rows,
          dataPrice[1],
          "%20",
          dataPriceCate
        )
          .then((res) => {
            setProduct(res.data["content"]);
          })
          .catch((err) => console.log(err));
      } else if (
        typeof dataPrice[0] === "number" &&
        typeof dataPrice[1] === "number"
      ) {
        getProductKeywordPagiPrice(
          "%20",
          "more",
          first,
          rows,
          dataPrice[0],
          dataPrice[1],
          dataPriceCate
        )
          .then((res) => {
            setProduct(res.data["content"]);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [dataPrice]);
  useEffect(() => {
    if (dataPriceCate?.length === 0) {
      return;
    }
    getProductKeywordPagiPrice(
      "%20",
      "more",
      first,
      rows,
      "%20",
      "%20",
      dataPriceCate
    )
      .then((res) => {
        setProduct(res.data["content"]);
      })
      .catch((err) => console.log(err));
  }, [dataPriceCate]);
  const headerImage = (id: number) => {
    let productI: any = imageProduct.filter((item) => item.productId === id);
    return (
      <Image
        onClick={() => {
          router.push(`/products/${id}`);
        }}
        src={`http://localhost:8080/images/imagesUpload/${productI[0]?.imageProduct}`}
      />
    );
  };
  let productItemImage: any = imageProduct.filter(
    (item) => item.productId === dataItem?.productId
  );
  const itemTemplate = (item: IImage) => {
    return (
      <img
        src={`http://localhost:8080/images/imagesUpload/${item.imageProduct}`}
        style={{ width: "100%" }}
      />
    );
  };

  const thumbnailTemplate = (item: IImage) => {
    return (
      <img
        width={120}
        src={`http://localhost:8080/images/imagesUpload/${item.imageProduct}`}
      />
    );
  };
  const addCart = () => {
    if (localStorage.getItem("access") === null) {
      router.push("/account/login");
    } else {
      if (dataItem !== undefined && dataItem["quantity"] !== 0) {
        postCartUser(
          selectedSize.value,
          dataItem,
          value,
          localStorage.getItem("username")
        )
          .then((res) => {
            if (res) {
              mutate("http://localhost:8080/products");
              toast.success("Thêm giỏ hàng thành công !");
              setVisible(false);
              setTimeout(() => setRenderData(!renderData), 8000);
            }
          })
          .catch((err) => console.log(err));
      } else if (dataItem !== undefined && dataItem["quantity"] === 0) {
        toast.error("Sản phẩm này đã bị hết hàng !");
      }
    }
  };
  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  return (
    <>
      <ToastContainer />
      <Image src={img.src} alt="Image" className="w-full" width="100%" />
      {products?.length === 0 ? (
        <>
          <h2 className="mt-5 flex justify-center align-items-center text-[22px] text-[#C70000]">
            <i className="pi pi-exclamation-circle mr-2 text-[27px]"></i>Không
            có sản phẩm nào phù hợp !
          </h2>
        </>
      ) : (
        <div className="mt-5">
          {isLoading && <Loading />}
          {!isLoading && (
            <>
              <div className="grid flex">
                {products?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="card col-3 flex justify-content-cente cursor-pointer"
                  >
                    <Card
                      title={headerImage(item["productId"])}
                      className="cardItem"
                    >
                      <p
                        onClick={() => {
                          router.push(`/products/${item["productId"]}`);
                        }}
                      >
                        {item["name"]}
                      </p>
                      <div className="flex">
                        <p
                          onClick={() => {
                            router.push(`/products/${item["productId"]}`);
                          }}
                          className="text-[red]"
                        >
                          {item["price"]}đ
                        </p>
                        <p
                          onClick={() => {
                            router.push(`/products/${item["productId"]}`);
                          }}
                        >
                          {item["sale"]}%
                        </p>
                      </div>
                      <Button
                        label="Thêm vào giỏ"
                        icon="pi pi-cart-plus"
                        iconPos="right"
                        className="mt-2"
                        onClick={() => {
                          setVisible(true);
                          setItem(item);
                        }}
                      />
                    </Card>
                  </div>
                ))}
                <div className="col-12">
                  <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={24}
                    rowsPerPageOptions={[4, 8, 12]}
                    onPageChange={onPageChange}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <Dialog
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="grid flex my-0 ">
          <div className="col-5 bg-[#fff]">
            <Galleria
              value={productItemImage}
              className="w-full"
              item={itemTemplate}
              thumbnail={thumbnailTemplate}
            />
          </div>
          <div className="col-7 bg-[#fff]">
            <h2 className="text-[25px] font-[600] opacity-[0.8]">
              {dataItem?.name}
            </h2>
            <div className="mt-2 w-full bg-[#FAFAFA] ">
              <div className="py-3 flex">
                <h2 className="text-[20px] font-[500] ml-3 flex justify-start align-items-center w-[30%]">
                  {" "}
                  Giá:
                </h2>
                <p className="text-[red] text-[25px] font-[600] justify-center flex  align-items-center">
                  {dataItem?.price}đ
                </p>
                <span className="ml-5 rounded-sm flex justify-center align-items-center w-5rem text-[red] font-[600] border-1 border-[red]">
                  -{dataItem?.sale} %
                </span>
              </div>
            </div>
            <div className="mt-4 flex">
              <h2 className="text-[17px] font-[500] ml-3 flex justify-start align-items-center w-[30%]">
                {" "}
                Kích thước:
              </h2>
              <div className="w-[70%] flex justify-between">
                {dataSize.map((item, index) => {
                  return (
                    <div key={index} className="flex align-items-center">
                      <RadioButton
                        inputId={item.key}
                        name="size"
                        className="border-3 border-[#F0E68C] border-circle kichthuoc"
                        value={item}
                        onChange={(e) => setSelectedSize(e.value)}
                        checked={selectedSize?.key === item.key}
                      />
                      <label
                        htmlFor={item.key}
                        className="ml-0  cursor-pointer text-[16px] font-[600] opacity-[0.7]"
                      >
                        {item.value}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            {dataItem !== undefined && dataItem["quantity"] !== 0 ? (
              <div className="mt-4 flex">
                <h2 className="text-[17px] font-[500] ml-3 flex justify-start align-items-center w-[30%]">
                  {" "}
                  Số lượng:
                </h2>
                <InputNumber
                  value={value}
                  onValueChange={(e: any) => {
                    setValue(e.target.value);
                  }}
                  showButtons
                  buttonLayout="horizontal"
                  // style={{ width: "3rem" }}
                  className="border-2 rounded-md soluong"
                  decrementButtonClassName="p-button-secondary"
                  incrementButtonClassName="p-button-secondary"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                />
              </div>
            ) : (
              <></>
            )}
            <div className="mt-2 ml-3 flex justify-start align-items-center">
              <p className="p-1 border-1 bg-[#49C9DF] flex justify-center align-items-center text-[#fff] font-[500] border-round-lg">
                Còn {dataItem !== undefined ? dataItem["quantity"] : 0} sản phẩm
              </p>
            </div>
            <div className="flex w-full mt-3">
              <Button
                onClick={addCart}
                label="THÊM VÀO GIỎ HÀNG"
                className=" h-[3rem] w-full border-1 bg-[#FF0000] round-lg text-[#fff] text-[15px] font-[500]"
              />
            </div>
            <div className="mt-4">
              <div className="border-bottom-2">
                <h2 className="text-[20px] font-[600] flex justify-start align-items-center w-[100%]">
                  {" "}
                  MÔ TẢ SẢN PHẨM
                </h2>
              </div>
              <div className="mt-3">
                <p>{dataItem?.decription}</p>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default Content;
