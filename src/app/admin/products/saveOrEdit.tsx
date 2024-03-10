"use client";

import InputTextObject from "@/components/InputForms/InputTextObject";
import InputNumberObject from "@/components/InputForms/InputNumberObject";
import InputSelectedObject from "@/components/InputForms/InputSelectObject";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputTextareaObject from "@/components/InputForms/InputTextareaObject";
import "./product.css";

const ProductThaoTac = (props: any) => {
  const {
    defaultValues,
    header,
    visible,
    onSubmit,
    close,
    dataSize,
    dataCate,
  } = props;
  const { control, handleSubmit, reset, formState } = useForm<
    Partial<IProduct>
  >({
    defaultValues,
    mode: "onChange",
  });
  useEffect(() => {
    reset({ ...defaultValues });
  }, [defaultValues]);
  const footer = (
    <div className="flex justify-around">
      <Button
        type="submit"
        label="Gửi"
        onClick={handleSubmit(onSubmit)}
        className="w-[30%] text-[#fff] bg-[#0891B2]"
        disabled={!formState.isValid || !formState.isDirty ? true : false}
      />
      <Button
        label="Thoát"
        onClick={close}
        className="w-[30%] text-[#fff] bg-[#475569]"
      />
    </div>
  );
  return (
    <form>
      <Dialog
        visible={visible}
        header={header}
        draggable={false}
        resizable={false}
        footer={footer}
        closable={false}
      >
        <div className="flex flex-wrap justify-content-between gap-5">
          <div className="flex gap-5">
            <div className="w-[50%]">
              <InputTextObject
                label={"Tên sản phẩm"}
                control={control}
                message={"Vui lòng nhập trường này"}
                name={"name"}
                note={true}
                horizontal={false}
              ></InputTextObject>

              <InputNumberObject
                label={"Sale sản phẩm"}
                control={control}
                message={"Vui lòng nhập trường này"}
                name={"sale"}
                note={true}
                horizontal={false}
              ></InputNumberObject>
              <InputNumberObject
                label={"Giá sản phẩm"}
                control={control}
                message={"Vui lòng nhập trường này"}
                name={"price"}
                note={true}
                horizontal={false}
              ></InputNumberObject>
            </div>
            <div className="card w-[50%]">
              <InputNumberObject
                label={"Số lượng sản phẩm"}
                control={control}
                message={"Vui lòng nhập trường này"}
                name={"quantity"}
                note={true}
                horizontal={false}
              ></InputNumberObject>
              <InputTextareaObject
                name="decription"
                label={"Mô tả sản phẩm"}
                control={control}
                note={true}
                message={"Vui lòng nhập trường này"}
                horizontal={false}
              />
              <InputSelectedObject
                control={control}
                label={"Loại sản phẩm"}
                name="categoryId"
                options={dataCate}
              ></InputSelectedObject>
            </div>
          </div>
        </div>
      </Dialog>
    </form>
  );
};
export default ProductThaoTac;
