"use client";
// "use server";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import { useForm } from "react-hook-form";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import { loginUser } from "../../../service/loginService";
import React, { useContext, useEffect, useState } from "react";
import XacThucEmail from "./Xacthuc";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { LayoutContext } from "@/components/Component/Component";

type FormData = {
  username: string;
  password: string;
};
const Login = () => {
  const context = useContext(LayoutContext);
  const { renderData, setRenderData } = context;
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  useEffect(() => {
    localStorage.clear();
    Cookies.remove("access-token");
    Cookies.remove("role-token");
  }, []);
  const handleLogin = (data: any) => {
    loginUser(data)
      .then((res) => {
        if (res) {
          localStorage.setItem("access", res.data.token);
          localStorage.setItem("username", res.data.message);
          localStorage.setItem("role", res.data.role);
          Cookies.set("access-token", res.data.token);
          Cookies.set("role-token", res.data.role);
          if (res.data.role !== "ADMIN") {
            axios
              .put(
                "https://api.chatengine.io/users/",
                {
                  username: data["username"],
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
                      usernames: ["admin", data["username"]],
                      title: `Xin chào ${data["username"]}`,
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
                  .then((a) => {});
              })
              .catch((err) => console.log(err));
          }
          reset();
          setRenderData(!renderData);
          setTimeout(() => router.push("/"), 800);
        } else {
          toast.error("Tài khoản không tồn tại");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Tài khoản không tồn tại");
      });
  };
  const header = (
    <div className="flex mt-4">
      <Link
        href={"/account/login"}
        passHref
        className="w-[50%] flex justify-center font-[700] text-[#000] text-[25px] border-right-1 border-bluegray-100"
      >
        Đăng nhập
      </Link>
      <Link
        href={"/account/register"}
        passHref
        className="w-[50%] flex justify-center text-[#cacaca] font-[700] text-[25px] border-left-1 border-bluegray-100 hover:text-[#000] transition-all"
      >
        Đăng ký
      </Link>
    </div>
  );
  return (
    <div className="w-full">
      <ToastContainer />
      <div className="card flex justify-content-center">
        <Card header={header} className="w-[600px] mt-[80px] mb-[150px]">
          <form onSubmit={handleSubmit(handleLogin)}>
            <span className="p-float-label mt-1">
              <InputText
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
            <span className="p-float-label mt-4">
              <InputText
                type="password"
                id="password"
                {...register("password", {
                  required: "Vui lòng nhập vào trường này",
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
              <span className="text-[#009dde]">Privacy Policy</span>
              and <span className="text-[#009dde]">Terms of Service</span>{" "}
              apply.
            </p>
            <div className="flex align-items-center mt-3">
              <Button
                type="submit"
                label="Đăng nhập"
                className="mt-1 w-[40%] rounded-[15px] h-3rem bg-[#080808] text-[#fff]"
              />
              <div className="ml-3">
                <p className="mt-1">
                  Khách hàng mới?{" "}
                  <span className="text-[#009dde] cursor-pointer">
                    Tạo tài khoản
                  </span>
                </p>
                <p className="mt-1">
                  Quên mật khẩu?{" "}
                  <span
                    onClick={() => setIsEmail(true)}
                    className="text-[#009dde] cursor-pointer"
                  >
                    Khôi phục mật khẩu
                  </span>
                </p>
              </div>
            </div>
          </form>
        </Card>
      </div>
      <XacThucEmail isEmail={isEmail} setIsEmail={setIsEmail} />
    </div>
  );
};
export default Login;
