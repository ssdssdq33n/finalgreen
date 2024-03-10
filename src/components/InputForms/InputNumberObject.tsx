import React from "react";
import { useController } from "react-hook-form";
import { InputNumber } from "primereact/inputnumber";
import MessageValidate from "../MessageValidate/messageValidate";

const InputNumberObject = (props: any) => {
  const {
    control,
    name,
    label,
    message,
    note = false,
    horizontal = true,
    ...prop
  } = props;
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: null,
    rules: { required: note },
  });

  return (
    <div
      className={`flex relative ${name === "quantity" ? "mt-2" : "mt-3"} z-0 ${
        horizontal
          ? "justify-content-start align-items-center"
          : "flex-column gap-1"
      }`}
    >
      <label
        htmlFor={name}
        className={`${horizontal ? "col-4" : ""} p-0 text-sm font-[600]`}
      >
        {label} {note ? <span className="ml-1 text-[red]">(*)</span> : ""}
      </label>
      <InputNumber
        useGrouping={false}
        id={name}
        className="w-full border-3 rounded-md"
        placeholder={prop.placeholder}
        value={field.value}
        onValueChange={(e) => field.onChange(e)}
      />
      {error && note && (
        <MessageValidate
          className={`absolute left-0 translate-y-100 ${
            horizontal ? "bottom-auto" : "bottom-0"
          }`}
          message={message}
        ></MessageValidate>
      )}
    </div>
  );
};

export default InputNumberObject;
