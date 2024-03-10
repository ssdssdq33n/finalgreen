"use client";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import Cookies from "js-cookie";
import "./register.css";
import { createUser, getEmail } from "../../../service/userService";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import axios from "axios";

type FormData = {
  name: string;
  email: string;
  username: string;
  password: string;
};
const Register = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isTen, setIsTen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [dulieu, setDulieu] = useState<FormData>();
  const [ranDom, setRanDom] = useState<string>("");
  const [soBack, setSoBack] = useState<string>("");
  const [err, setErr] = useState<string>();
  const toast = useRef<any>(null);
  const router = useRouter();
  // );
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
      username: "",
      password: "",
      // id: "2",
    },
  });
  useEffect(() => {
    localStorage.clear();
    Cookies.remove("access-token");
    Cookies.remove("role-token");
  }, []);
  const SubmitForm = (data: any) => {
    setDulieu(data);
    getEmail(data)
      .then((res) => {
        if (res.data === "ton tai") {
          reset();
          setIsTen(true);
          setVisible(false);
        } else {
          setVisible(true);
          setSoBack(res.data.toString());
        }
      })
      .catch((err) => console.log(err));
  };
  const handleResetMa = () => {
    setLoading(true);
    getEmail(dulieu)
      .then((res) => {
        setSoBack(res.data.toString());
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmitData = (e: any) => {
    e.preventDefault();
    console.log(dulieu);
    if (ranDom?.length === 0) {
      setErr(`Bạn chưa nhập mã`);
    } else if (ranDom.includes(soBack)) {
      setLoading(true);
      createUser(dulieu)
        .then((res) => {
          if (res) {
            if (dulieu !== undefined) {
              axios
                .post(
                  "https://api.chatengine.io/users/",
                  {
                    username: dulieu["username"],
                    secret: "123456",
                  },
                  {
                    headers: {
                      "Private-key": "32544cfa-e537-4f5d-9d29-68ed082cad35",
                    },
                  }
                )
                .then((r) => {
                  axios
                    .put(
                      "https://api.chatengine.io/chats/",
                      {
                        usernames: ["admin", dulieu["username"]],
                        title: `Xin chào ${dulieu["username"]}`,
                        is_direct_chat: false,
                      },
                      {
                        headers: {
                          "Project-ID": "2f9518a5-9f13-4be0-9e34-2eda4e91c9ef",
                          "User-Name": "admin",
                          "User-Secret": "123456",
                        },
                      }
                    )
                    .then((a) => {
                      router.push("/account/login");
                    });
                })
                .catch((err) => console.log(err));
            }
            reset();
            setVisible(false);
            router.push("/account/login");
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else if (!ranDom.includes(soBack)) {
      setErr("Mã nhập không hợp lệ");
    }
  };
  const header = (
    <div className="flex mt-4">
      <Link
        href={"/account/login"}
        className="w-[50%] flex justify-center font-[700] text-[#cacaca] text-[25px] border-right-1 border-bluegray-100 hover:text-[#000] transition-all"
      >
        Đăng nhập
      </Link>
      <Link
        href={"/account/register"}
        className="w-[50%] flex justify-center text-[#000] font-[700] text-[25px] border-left-1 border-bluegray-100 "
      >
        Đăng ký
      </Link>
    </div>
  );
  return (
    <div className="w-full">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div className="card flex justify-content-center">
            <Card header={header} className="w-[600px] mt-[80px] mb-[150px]">
              <form ref={form} onSubmit={handleSubmit(SubmitForm)}>
                <span className="p-float-label mt-1">
                  <InputText
                    type="text"
                    id="name"
                    {...register("name", {
                      required: "Vui lòng nhập vào trường này",
                    })}
                    className="w-full h-3rem border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff]"
                  />
                  <label htmlFor="name">Họ và tên</label>
                </span>
                {errors.name?.message && (
                  <p className="text-[red] font-[500] text-[15px]">
                    <i className="pi pi-exclamation-triangle"></i>{" "}
                    {errors.name?.message}
                  </p>
                )}
                <span className="p-float-label mt-4">
                  <InputText
                    type="text"
                    id="email"
                    {...register("email", {
                      required: "Vui lòng nhập vào trường này",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Trường email không hợp lệ",
                      },
                    })}
                    className="w-full h-3rem border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff]"
                  />
                  <label htmlFor="email">Email</label>
                </span>
                {errors.email?.message && (
                  <p className="text-[red] font-[500] text-[15px]">
                    <i className="pi pi-exclamation-triangle"></i>{" "}
                    {errors.email?.message}
                  </p>
                )}
                <span className="p-float-label mt-4">
                  <InputText
                    onFocus={() => setIsTen(false)}
                    type="text"
                    id="username"
                    {...register("username", {
                      required: "Vui lòng nhập vào trường này",
                    })}
                    className="w-full h-3rem border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff]"
                  />
                  <label htmlFor="username">Username</label>
                </span>
                {errors.username?.message && (
                  <p className="text-[red] font-[500] text-[15px]">
                    <i className="pi pi-exclamation-triangle"></i>{" "}
                    {errors.username?.message}
                  </p>
                )}
                {isTen ? (
                  <p className=" text-[red] font-[500] text-[15px]">
                    {" "}
                    <i className="pi pi-exclamation-triangle mr-1"></i>Tên đăng
                    nhập đã tồn tại
                  </p>
                ) : (
                  <></>
                )}
                <span className="p-float-label mt-4">
                  <InputText
                    type="password"
                    id="password"
                    {...register("password", {
                      required: "Vui lòng nhập vào trường này",
                      minLength: {
                        value: 6,
                        message: "Mật khẩu tối thiểu phải 6 ký tự",
                      },
                    })}
                    className="w-full h-3rem border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff]"
                  />
                  <label htmlFor="password">Password</label>
                </span>
                {errors.password?.message && (
                  <p className="text-[red] font-[500] text-[15px]">
                    <i className="pi pi-exclamation-triangle"></i>{" "}
                    {errors.password?.message}
                  </p>
                )}
                <p className="mt-2">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <span className="text-[#009dde]">Privacy Policy </span>
                  and <span className="text-[#009dde]">
                    Terms of Service
                  </span>{" "}
                  apply.
                </p>
                <div className="flex align-items-center mt-3">
                  <Button
                    type="submit"
                    label="Đăng ký"
                    className="mt-1 w-[40%] rounded-[15px] h-3rem bg-[#080808] text-[#fff]"
                  />
                  <div className="ml-3">
                    <p className="mt-1">
                      Bạn đã có tài khoản ?{" "}
                      <Link
                        href={"/account/login"}
                        className="text-[#009dde] cursor-pointer"
                      >
                        Đăng nhập ngay
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </Card>
          </div>
          <Dialog
            className="z-1"
            header="Nhập mã email"
            visible={visible}
            style={{ width: "20vw" }}
            onHide={() => {
              setVisible(false);
              setRanDom("");
              setDulieu(undefined)
              reset()
              setErr("");
              router.refresh()
            }}
          >
            <form>
              <InputText
                value={ranDom}
                onChange={(e: any) => setRanDom(e.target.value)}
                className="border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff] w-full"
              />
              <span className="text-[red] mt-1">{err}</span>
              <div className="mt-3 flex justify-around">
                <Button
                  label="Gửi"
                  onClick={handleSubmitData}
                  className="bg-[#000] w-[35%] text-[#fff]"
                />
                <Button
                  onClick={() => {
                    handleResetMa(), setRanDom("");
                  }}
                  // type="reset"
                  label="Nhận lại mã"
                  className="text-[#43C1DE]"
                />
              </div>
            </form>
          </Dialog>
        </>
      )}
    </div>
  );
};
export default Register;
