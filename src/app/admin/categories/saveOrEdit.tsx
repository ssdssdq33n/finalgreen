"use client";

import InputTextObject from "@/components/InputForms/InputTextObject";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CategoryThaoTac = (props: any) => {
  const { defaultValues, header, visible, onSubmit, close } = props;
  const { control, handleSubmit, reset, formState } = useForm<ICategory>({
    defaultValues,
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
          <div className="flex flex-column gap-5">
            <InputTextObject
              label={"Tên loại sản phẩm"}
              control={control}
              note={true}
              message={"Vui lòng nhập trường này"}
              name={"name"}
              horizontal={false}
            ></InputTextObject>
          </div>
        </div>
      </Dialog>
    </form>
  );
};
export default CategoryThaoTac;
