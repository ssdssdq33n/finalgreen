"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import Cookies from "js-cookie";

const Error = () => {
  const router = useRouter();
  return (
    <>
      <div className="grid flex mt-5">
        <div className="col-8 flex justify-center">
          <div className="w-[60%]">
            <h2 className="flex font-[700] text-[23px]">
              Bạn không đủ thẩm quyền để truy cập vào trang này
            </h2>
            <p className="mt-5 ">
              Bạn muốn truy cập? Hãy yêu cầu quyền truy cập hoặc chuyển sang tài
              khoản có quyền truy cập.
            </p>
            <div className="w-full mt-5 mb-4">
              <Button
                label="Chuyển đổi tài khoản"
                className="border-2 bg-[#ccc] px-2 py-2"
                onClick={() => {
                  localStorage.clear();
                  Cookies.remove("role-token");
                  Cookies.remove("access-token");
                  router.push("/account/login");
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-4 flex justify-start align-items-center">
          <i className="pi pi-lock text-[100px]"></i>
        </div>
      </div>
    </>
  );
};
export default Error;
