import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { guiXacThucEmail } from "../../../service/loginService";
import KhoiPhuc from "./KhoiPhuc";

type FormData = {
  email: string;
};
const XacThucEmail = (props: any) => {
  const { isEmail, setIsEmail } = props;
  const [ranDom, setRanDom] = useState<any>();
  const [nhapso, setNhapSo] = useState<any>();
  const [resetMa, setResetMa] = useState<FormData>();
  const [visible, setVisible] = useState<boolean>(false);
  const [isShow, setShow] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });
  const handleGuiEmail = (data: FormData) => {
    console.log(data);
    setResetMa(data);
    guiXacThucEmail(data)
      .then((res) => {
        setRanDom(res.data.toString());
        setIsEmail(false);
        setVisible(true);
      })
      .catch((err) => console.log(err));
  };
  const handleResetMa = () => {
    guiXacThucEmail(resetMa)
      .then((res) => {
        setRanDom(res.data.toString());
      })
      .catch((err) => console.log(err));
  };
  const handleSubmitData = (e: any) => {
    e.preventDefault();
    if (nhapso.length === 0) {
      setErr(`Bạn chưa nhập mã`);
    } else if (!nhapso.includes(ranDom)) {
      setErr("Mã nhập không hợp lệ");
    } else if (nhapso.includes(ranDom)) {
      setVisible(false);
      setShow(true);
    }
  };
  return (
    <div>
      <Dialog
        className="z-1"
        header="Nhập tài khoản email"
        visible={isEmail}
        style={{ width: "23vw" }}
        onHide={() => {
          setIsEmail(false);
          reset({ email: "" });
        }}
      >
        <form onSubmit={handleSubmit(handleGuiEmail)}>
          <InputText
            id="email"
            placeholder="email"
            {...register("email", {
              required: "Vui lòng nhập vào trường này",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Trường email không hợp lệ",
              },
            })}
            className="border-1 border-bluegray-200 bg-[#cacaca] focus:bg-[#fff] w-full"
          />
          {errors.email?.message && (
            <p className="text-[red] font-[500] text-[15px]">
              <i className="pi pi-exclamation-triangle"></i>{" "}
              {errors.email?.message}
            </p>
          )}
          <div className="mt-3 flex justify-around">
            <Button label="Gửi" className="bg-[#000] w-[35%] text-[#fff]" />
            <Button type="reset" label="Reset" className="text-[#43C1DE]" />
          </div>
        </form>
      </Dialog>
      <>
        <Dialog
          className="z-1"
          header="Xác thực tài khoản email"
          visible={visible}
          style={{ width: "24vw" }}
          onHide={() => {
            setVisible(false);
          }}
        >
          <form>
            <InputText
              value={nhapso}
              onChange={(e: any) => setNhapSo(e.target.value)}
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
                onClick={handleResetMa}
                type="reset"
                label="Nhận lại mã"
                className="text-[#43C1DE]"
              />
            </div>
          </form>
        </Dialog>
      </>
      <>
        <KhoiPhuc isShow={isShow} setShow={setShow} />
      </>
    </div>
  );
};
export default XacThucEmail;
