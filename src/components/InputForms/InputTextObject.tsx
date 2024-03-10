import React from "react";
import { useController } from "react-hook-form";
import MessageValidate from "../MessageValidate/messageValidate";
import { InputText } from "primereact/inputtext";

const InputTextObject = (props: any) => {
  const {
    control,
    name,
    label,
    message = "",
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
    rules: {
      required: note,
    },
  });

  return (
    <div
      className={`flex mt-2 relative ${
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
      <InputText
        id={name}
        className={"w-full border-3"}
        // maxLength={prop.maxLength}
        placeholder={prop.placeholder}
        {...field}
        autoComplete="off"
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

export default InputTextObject;
