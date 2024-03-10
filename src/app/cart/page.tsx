"use client";
import { deleteCart, getAllCart } from "@/service/serviceCart/service";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { getAllImageProduct } from "../../service/imageService";
import { ToastContainer, toast } from "react-toastify";
import { InputTextarea } from "primereact/inputtextarea";
import { Image } from "primereact/image";
import { useRouter } from "next/navigation";
import "./cart.css";

const Cart = () => {
  const router = useRouter();
  const [dataCart, setCart] = useState<Icart[]>([]);
  const [renderData, setRenderData] = useState<boolean>(false);
  const [imageProduct, setImage] = useState<IImage[]>([]);
  useEffect(() => {
    getAllCart(localStorage.getItem("username"))
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => console.log(err));
    getAllImageProduct()
      .then((res) => {
        if (res) {
          setImage(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [renderData]);
  let coin: number | undefined = dataCart?.reduce((tong: any, item: Icart) => {
    return tong + item["product"]["price"] * item["quantity"];
  }, 0);
  let total: number | undefined = dataCart?.reduce((tong: any, item: any) => {
    return tong + item.quantity;
  }, 0);
  const handleDelete = (cart: Icart) => {
    deleteCart(cart["cartId"])
      .then((res) => {
        if (res.data.includes("thanh cong")) {
          setRenderData(!renderData);
          toast.success("Xóa sản phẩm thành công !");
        }
      })
      .catch((err) => console.log(err));
  };
  const headerImage = (id: number) => {
    let productI: any = imageProduct.filter((item) => item.productId === id);
    return (
      <Image
        // width="110"
        className="h-full w-full imgCart"
        src={`http://localhost:8080/images/imagesUpload/${productI[0]?.imageProduct}`}
      />
    );
  };
  return (
    <>
      <ToastContainer />
      <div>
        <p
          className="py-2 text-[13px] opacity-70 text-[#000]"
          style={{ wordSpacing: "5px !important" }}
        >
          Trang chủ / Giỏ hàng ({total})
        </p>
        <div className="grid flex mx-0 mt-0 mb-5">
          <div className="col-8 py-0 px-0">
            <div className="w-[95%] flex justify-center bg-[#fff] border-round shadow-lg">
              <div className="w-[93%] mt-2">
                <h2 className="text-[23px] font-[600] opacity-[0.8] pb-2 border-bottom-1">
                  Giỏ hàng của bạn
                </h2>
                <div className="pt-3 pb-1">
                  <p>
                    Bạn đang có{" "}
                    <span className="font-[700]">{total} sản phẩm</span> trong
                    giỏ hàng
                  </p>
                </div>
                <div className="h-[250px] overflow-y-auto overflow-x-hidden surface-overlay">
                  {dataCart?.map((item: Icart, index: number) => {
                    return (
                      <div
                        className="border-round-lg border-2 mt-2 mr-2"
                        key={index}
                      >
                        <div className="grid flex p-0 m-0">
                          <div className="col-2 flex justify-center align-items-center">
                            {headerImage(item["product"]["productId"])}
                          </div>
                          <div className="col-6">
                            <h2 className="font-[700] opacity-[0.7] font-italic">
                              {item["product"]["name"]}
                            </h2>
                            <h2 className="font-[700] opacity-[0.7] font-italic">
                              Kích cỡ : {item["size"]}
                            </h2>
                            <h2 className="font-[700] opacity-[0.7] font-italic">
                              Số lượng : {item["quantity"]}
                            </h2>

                            <h2 className="font-[700] opacity-[0.7] font-italic">
                              Giá :{" "}
                              <span className="text-[#96A3B8] opacity-1">
                                {item["product"]["price"]} đ
                              </span>{" "}
                            </h2>
                          </div>
                          <div className="col-4">
                            <h2 className="font-[700] opacity-[0.8] flex justify-end">
                              {item["product"]["price"] * item["quantity"]} đ
                            </h2>
                            <div className="w-full flex justify-end mt-2">
                              <Button
                                onClick={() => {
                                  handleDelete(item);
                                }}
                                label="Xóa"
                                className="w-[50%] bg-[#8F9BB3] text-[#fff]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 bg-[#F3F4F4] flex justify-center">
                  <div className="w-[95%] mt-3">
                    <h2 className="text-[15px] font-[700] opacity-[0.9]">
                      Ghi chú đơn hàng
                    </h2>
                    <div className="my-2">
                      <InputTextarea className="w-full h-5rem border-2" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 mb-4">
                  <h2 className="font-[700] flex align-item-center">
                    <i className="pi pi-verified mr-2 text-[18px] text-[#EAC93D]"></i>
                    Xuất hoá đơn cho đơn hàng
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 py-0 px-0">
            <div className="flex justify-center bg-[#fff] border-round shadow-lg">
              <div className="w-[90%] mt-3">
                <h2 className="text-[20px] font-[600] opacity-[0.8]">
                  Thông tin đơn hàng
                </h2>
                <div className="border-1 bg-[#FCFCFC] flex justify-center mt-2">
                  <div className="w-[95%] py-2 flex justify-between">
                    <p className="text-[15px] opacity-[0.7]">
                      THỜI GIAN GIAO HÀNG :
                    </p>
                    <p className="text-[13px] opacity-[0.7]">
                      Giao khi có hàng
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between border-bottom-2 border-dotted">
                  <h2 className="text-[16px] font-[700] opacity-[0.8] flex align-items-center">
                    Tổng tiền:
                  </h2>
                  <h3 className="text-[#FF0908] text-[22px] font-[700] flex align-items-center">
                    {coin} đ
                  </h3>
                </div>
                <div className="mt-3">
                  <p>
                    <i className="pi pi-circle-fill mr-2 opacity-[0.6] text-[12px]"></i>
                    <span className="font-[700]">Miễn phí vận chuyển</span> đơn
                    hàng từ 1,000,000đ
                  </p>
                  <p className="mt-2">
                    <i className="pi pi-circle-fill mr-2 opacity-[0.6] text-[12px]"></i>
                    Vui lòng nhập <span className="font-[700]">MÃ_ƯU_ĐÃI</span>{" "}
                    tại trang thanh toán
                  </p>
                </div>
                <Button
                  onClick={() => {
                    router.push("/checkouts");
                  }}
                  className="mt-3 mb-4 bg-[#FF0000] text-[#fff] w-full h-3rem"
                  label="THANH TOÁN"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
