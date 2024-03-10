"use client";
import { getAllCart } from "@/service/serviceCart/service";
import { useEffect, useRef, useState } from "react";
import { getAllImageProduct } from "../../service/imageService";
import { Image } from "primereact/image";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import logo from "./imageCheck/logo.webp";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";

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
  carts: any;
};
const CheckOut = () => {
  const form = useRef<any>();
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      number: "",
      address: "",
      city: "",
      district: "",
      ward: "",
      total: "",
      username: "",
    },
  });
  const router = useRouter();
  const [dataCart, setCart] = useState<Icart[]>([]);
  const [renderData, setRenderData] = useState<boolean>(false);
  const [imageProduct, setImage] = useState<IImage[]>([]);
  const [dataCity, setCity] = useState<any>([]);
  const [valueCity, setValueCity] = useState<any>([]);
  const [dataDistrict, setDistrict] = useState<any>([]);
  const [valueDistrict, setValueDistrice] = useState<any>([]);
  const [dataWard, setWard] = useState<any>([]);
  const [valueWard, setValueWard] = useState<any>([]);
  const [error1, setError1] = useState<boolean>(false);
  const [error3, setError3] = useState<boolean>(false);
  const [error2, setError2] = useState<boolean>(false);
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
    axios
      .get("https://vapi.vnappmob.com/api/province", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setCity(res.data["results"]);
      })
      .catch((err) => console.log(err));
  }, [renderData]);
  useEffect(() => {
    axios
      .get(
        `https://vapi.vnappmob.com/api/province/district/${valueCity["province_id"]}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setDistrict(res.data["results"]);
      })
      .catch((err) => console.log(err));
  }, [valueCity]);
  useEffect(() => {
    axios
      .get(
        `https://vapi.vnappmob.com/api/province/ward/${valueDistrict["district_id"]}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setWard(res.data["results"]);
      })
      .catch((err) => console.log(err));
  }, [valueDistrict]);
  let coin: number | undefined = dataCart?.reduce((tong: any, item: Icart) => {
    return tong + item["product"]["price"] * item["quantity"];
  }, 0);
  const headerImage = (id: number) => {
    let productI: any = imageProduct.filter((item) => item.productId === id);
    return (
      <div>
        <Image
          // width="110"
          className="h-full w-full imgCart"
          src={`http://localhost:8080/images/imagesUpload/${productI[0]?.imageProduct}`}
        />
      </div>
    );
  };
  const SubmitForm = (data: FormData) => {
    if (valueCity["province_name"]?.length === undefined) {
      setError1(true);
    } else {
      setError1(false);
    }
    if (valueDistrict["district_name"]?.length === undefined) {
      setError2(true);
    } else {
      setError2(false);
    }
    if (valueWard["ward_name"]?.length === undefined) {
      setError3(true);
    } else {
      setError3(false);
    }
    if (
      valueWard["ward_name"]?.length > 0 &&
      valueCity["province_name"]?.length > 0 &&
      valueDistrict["district_name"]?.length > 0
    ) {
      data["city"] = valueCity["province_name"];
      data["district"] = valueDistrict["district_name"];
      data["ward"] = valueWard["ward_name"];
      data["total"] = `${coin !== undefined ? coin + 25000 : 0}`;
      data["username"] = localStorage.getItem("username");
      data["carts"] = dataCart;
      console.log(data);
      axios
        .post("http://localhost:8080/details", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + localStorage.getItem("access"),
          },
        })
        .then((res) => {
          if (res.data) {
            router.push("/succes");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="z-5 fixed bottom-0 top-0  left-0 right-0 bg-[#fff] flex grid">
        <div className="col-7">
          <div className="flex grid mt-5">
            <div className="col-2"></div>
            <div className="col-9">
              <div className="mt-5">
                {" "}
                <Image
                  src={logo.src}
                  width="100"
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                />
                <div className="mt-4 flex align-items-center">
                  <p
                    className="text-[14px] cursor-pointer"
                    onClick={() => {
                      router.push("/cart");
                    }}
                  >
                    Giỏ hàng
                  </p>
                  <i className="pi pi-angle-right mx-1 text-[14px] opacity-[0.7]"></i>
                  <p className="text-[14px]">Thông tin giao hàng</p>
                </div>
                <div className="mt-2">
                  <h2 className="text-[20px] font-sans font-[600]">
                    Thông tin giao hàng
                  </h2>
                </div>
              </div>
              <form
                className="border-bottom-1"
                ref={form}
                onSubmit={handleSubmit(SubmitForm)}
              >
                <div>
                  <InputText
                    placeholder="   Họ và tên"
                    type="text"
                    id="name"
                    {...register("name", {
                      required: "Vui lòng nhập vào trường này",
                    })}
                    className="w-full h-3rem border-2 border-noround bg-[#fff] focus:bg-[#fff] mt-2"
                  />
                  {errors.name?.message && (
                    <p className="text-[red] font-[500] text-[15px]">
                      <i className="pi pi-exclamation-triangle"></i>{" "}
                      {errors.name?.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-between mt-3 align-items-center">
                  <div className="w-[66%]">
                    <InputText
                      placeholder="   Email"
                      type="text"
                      id="email"
                      {...register("email", {
                        required: "Vui lòng nhập vào trường này",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Trường email không hợp lệ",
                        },
                      })}
                      className="w-full h-3rem border-2 border-noround bg-[#fff] focus:bg-[#fff]"
                    />
                    {errors.email?.message && (
                      <p className="text-[red] font-[500] text-[15px]">
                        <i className="pi pi-exclamation-triangle"></i>{" "}
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-[32%]">
                    <InputText
                      placeholder="   Số điện thoại"
                      type="text"
                      id="number"
                      {...register("number", {
                        required: "Vui lòng nhập vào trường này",
                        pattern: {
                          value: /([1-9][0-9]*)|0/,
                          message: "Số điện thoại không hợp lệ",
                        },
                        maxLength: 10,
                      })}
                      className="w-full h-3rem border-2 border-noround bg-[#fff] focus:bg-[#fff]"
                    />
                    {errors.number?.message && (
                      <p className="text-[red] font-[500] text-[15px]">
                        <i className="pi pi-exclamation-triangle"></i>{" "}
                        {errors.number?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <InputText
                    placeholder="   Địa chỉ"
                    type="text"
                    id="address"
                    {...register("address", {
                      required: "Vui lòng nhập vào trường này",
                    })}
                    className="w-full h-3rem border-2 border-noround bg-[#fff] focus:bg-[#fff]"
                  />
                  {errors.address?.message && (
                    <p className="text-[red] font-[500] text-[15px]">
                      <i className="pi pi-exclamation-triangle"></i>{" "}
                      {errors.address?.message}
                    </p>
                  )}
                </div>
                <div className="mt-3 flex justify-between align-items-center">
                  <div className="w-[32%]">
                    <Dropdown
                      onChange={(e) => {
                        setValueCity(e.target.value);
                        if (e.target.value["province_name"]?.length > 0) {
                          setError1(false);
                        }
                      }}
                      value={valueCity}
                      options={dataCity}
                      optionLabel="province_name"
                      placeholder="Tỉnh / thành"
                      className="w-full h-3rem border-2 border-noround bg-[#fff] focus:bg-[#fff]"
                    />
                    {error1 && (
                      <p className="text-[red] font-[500] text-[15px]">
                        <i className="pi pi-exclamation-triangle"></i> Vui lòng
                        chọn tỉnh/thành
                      </p>
                    )}
                  </div>
                  <div className="w-[32%]">
                    <Dropdown
                      onChange={(e) => {
                        setValueDistrice(e.target.value);
                        if (e.target.value["district_name"]?.length > 0) {
                          setError2(false);
                        }
                      }}
                      value={valueDistrict}
                      options={dataDistrict}
                      optionLabel="district_name"
                      placeholder="Quận / huyện"
                      className="w-full h-3rem border-2 border-noround bg-[#fff] focus:bg-[#fff]"
                    />
                    {error2 && (
                      <p className="text-[red] font-[500] text-[15px]">
                        <i className="pi pi-exclamation-triangle"></i> Vui lòng
                        chọn quận/huyện
                      </p>
                    )}
                  </div>
                  <div className="w-[32%]">
                    <Dropdown
                      onChange={(e) => {
                        if (e.target.value["ward_name"]?.length > 0) {
                          setError3(false);
                        }
                        setValueWard(e.target.value);
                      }}
                      value={valueWard}
                      options={dataWard}
                      optionLabel="ward_name"
                      placeholder="Phường / xã"
                      className="w-full h-3rem border-2 border-noround bg-[#fff] focus:bg-[#fff]"
                    />
                    {error3 && (
                      <p className="text-[red] font-[500] text-[15px]">
                        <i className="pi pi-exclamation-triangle"></i> Vui lòng
                        chọn phường/xã
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between align-items-center mt-4 mb-5">
                  <p
                    onClick={() => router.push("/cart")}
                    className="text-[17px] cursor-pointer"
                  >
                    Giỏ hàng
                  </p>
                  <Button
                    type="submit"
                    label="Hoàn tất thanh toán"
                    className="bg-[#3DA9E2] text-[#fff] w-[43%] h-3rem border-noround"
                  />
                </div>
              </form>
              <div className="mt-3 flex justify-center">
                <p className="text-[14px]">Powered by Haravan</p>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
        <div className="col-5 bg-[#FAFAFA] border-left-2">
          <div className="w-[65%] ml-5 mt-5">
            <div className="h-[180px]  overflow-y-auto overflow-x-hidden border-bottom-1">
              {dataCart?.map((item: Icart, index: number) => {
                return (
                  <div className="mr-2" key={index}>
                    <div className="grid flex p-0 m-0 ">
                      <div className="col-2 flex justify-center align-items-center">
                        {headerImage(item["product"]["productId"])}
                      </div>
                      <div className="col-6">
                        <h2 className="font-[700] opacity-[0.7] font-italic">
                          {item["product"]["name"]}
                        </h2>
                        <h2 className="font-[700] opacity-[0.7] font-italic">
                          {item["size"]} / {item["quantity"]}
                        </h2>
                      </div>
                      <div className="col-4">
                        <h2 className=" text-[15px] opacity-[0.8] flex justify-end mt-2">
                          {item["product"]["price"] * item["quantity"]}₫
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-bottom-1 w-full flex justify-between align-items-center">
              <div className="w-[65%] py-3">
                <InputText
                  className="w-full h-3rem border-1"
                  placeholder="   Mã giảm giá"
                />
              </div>
              <Button
                className="w-[30%] h-3rem bg-[#C8C8C8] text-[#fff]"
                label="Sử dụng"
              />
            </div>
            <div className="w-full border-bottom-1">
              <div className="py-3">
                <div className="flex justify-between">
                  <p className="text-[14px] opacity-[0.7]">Tạm tính</p>
                  <p className="text-[15px]">{coin}₫</p>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-[14px] opacity-[0.7]">Phí vận chuyển</p>
                  <p className="text-[15px]">25,000₫</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <h2 className="text-[17px]">Tổng cộng</h2>
              <h2 className="text-[20px] font-[600] opacity-[0.8]">
                <span className="text-[#C8C8C8] text-[14px]">VND</span>{" "}
                {coin !== undefined ? coin + 25000 : 0}₫
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckOut;
