import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { khoiphucUser } from "../../../service/loginService";

type FormData = {
  tendangnhap: string;
  matkhau: string;
};
const KhoiPhuc = (props: any) => {
  const { isShow, setShow } = props;
  const [nhaplaimatkhau, setNhapLai] = useState<any>();
  const router = useRouter();
  const [err, setErr] = useState<string>("");
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      tendangnhap: "",
      matkhau: "",
    },
  });
  let nhaplai: string = watch("matkhau");
  const handleKhoiPhuc = (data: any) => {
    if (nhaplai.includes(nhaplaimatkhau)) {
      console.log(data);
      khoiphucUser(data)
        .then((res) => {
          if (res.data === "thanh cong") {
            setShow(false);
            reset({ tendangnhap: "", matkhau: "" });
            router.push("/account/login");
          } else {
            setErr("Tên đăng nhập không tồn tại");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <Dialog
        className="z-1"
        header="Khôi phục mật khẩu"
        visible={isShow}
        style={{ width: "23vw" }}
        onHide={() => {
          setShow(false);
          reset({ matkhau: "", tendangnhap: "" });
        }}
      >
        <form onSubmit={handleSubmit(handleKhoiPhuc)}>
          <InputText
            placeholder="Username"
            {...register("tendangnhap", {
              required: "Vui lòng nhập vào trường này",
            })}
            className="border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff] w-full"
          />
          {errors.tendangnhap?.message && (
            <p className="text-[red] font-[500] text-[15px]">
              <i className="pi pi-exclamation-triangle"></i>{" "}
              {errors.tendangnhap?.message}
            </p>
          )}
          {err.length > 0 && (
            <p className="text-[red] font-[500] text-[15px]">
              <i className="pi pi-exclamation-triangle"></i> {err}
            </p>
          )}
          <InputText
            type="password"
            placeholder="Mật khẩu mới"
            {...register("matkhau", {
              required: "Vui lòng nhập vào trường này",
              minLength: {
                value: 6,
                message: "Mật khẩu tối thiểu phải 6 ký tự",
              },
            })}
            className="border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff] w-full mt-2"
          />
          {errors.matkhau?.message && (
            <p className="text-[red] font-[500] text-[15px]">
              <i className="pi pi-exclamation-triangle"></i>{" "}
              {errors.matkhau?.message}
            </p>
          )}
          <InputText
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={nhaplaimatkhau}
            onChange={(e: any) => setNhapLai(e.target.value)}
            className="border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff] w-full mt-2"
          />
          {!nhaplai.includes(nhaplaimatkhau) && nhaplaimatkhau?.length > 0 ? (
            <p className="text-[red] font-[500] text-[15px]">
              <i className="pi pi-exclamation-triangle"></i> Mật khẩu nhập lại
              không đúng
            </p>
          ) : (
            <></>
          )}
          <div className="mt-3 flex justify-around">
            <Button label="Gửi" className="bg-[#000] w-[35%] text-[#fff]" />
            <Button type="reset" label="Reset" className="text-[#43C1DE]" />
          </div>
        </form>
      </Dialog>
    </div>
  );
};
export default KhoiPhuc;
