"use client";
import InputSelectedObject from "@/components/InputForms/InputSelectObject";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Image } from "primereact/image";
import "./Imageproduct.css";
import { convertFile } from "@/components/convertBase64/conver";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema: any = yup.object().shape({
  file1: yup
    .mixed()
    .test("required", "Vui lòng chọn file", (value: any) => {
      return value && value?.length;
    })
    .test("fileSize", "The file is too large", (value: any, context) => {
      return value && value[0] && value[0].size <= 100000;
    }),
});
const ImageProductThaoTac = (props: any) => {
  const {
    defaultValues,
    header,
    visible,
    onSubmit,
    close,
    dataProduct,
    filebase64,
    setFileBase64,
  } = props;
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      file1: defaultValues.file1,
    },
    mode: "onChange",
  });
  useEffect(() => {
    reset({ ...defaultValues });
  }, [defaultValues]);

  return (
    <Dialog
      visible={visible}
      header={header}
      draggable={false}
      resizable={false}
      closable={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputSelectedObject
          disabled={defaultValues?.imageId >= 0 ? true : false}
          control={control}
          label={"Tên sản phẩm"}
          name="productId"
          options={dataProduct}
        ></InputSelectedObject>
        <div className="flex flex-wrap justify-content-between gap-5">
          <div className="flex w-full gap-5">
            <div className="w-[50%]">
              <div className="">
                <input
                  style={{ display: "none" }}
                  type="file"
                  id={"file1"}
                  {...register("file1", {
                    onChange: (e) =>
                      convertFile(e.target.files[0], setFileBase64),
                  })}
                />
                <label
                  htmlFor={"file1"}
                  className="bg-[#34C3DC] cursor-pointer font-[600] border-3 w-[80%] text-[16px] block flex justify-center mt-3 mb-1"
                >
                  Upload Image
                </label>
                {errors.file1 && (
                  <p className="text-[red]">
                    <i className="pi pi-exclamation-triangle mr-1"></i>
                    Vui lòng chọn file
                  </p>
                )}
                <Image
                  alt="image-Product"
                  className="mt-4"
                  src={
                    defaultValues?.imageId >= 0
                      ? `http://localhost:8080/images/imagesUpload/${defaultValues.imageProduct}`
                      : filebase64
                  }
                />
              </div>
            </div>
            <div className="card w-[50%]"></div>
          </div>
        </div>
        <div className="flex justify-around mt-4">
          <Button
            type="submit"
            label="Gửi"
            className="w-[25%] text-[#fff] bg-[#0891B2]"
            disabled={!formState.isValid ? true : false}
          />
          <Button
            label="Thoát"
            onClick={() => {
              close(), setFileBase64(""), reset();
            }}
            className="w-[25%] text-[#fff] bg-[#475569]"
          />
        </div>
      </form>
    </Dialog>
  );
};
export default ImageProductThaoTac;
