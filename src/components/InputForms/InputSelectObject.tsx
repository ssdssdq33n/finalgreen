import { Dropdown } from "primereact/dropdown";
import React from "react";
import { useController } from "react-hook-form";

const InputSelectedObject = (props: any) => {
  const {
    control,
    name,
    label,
    options,
    filter = false,
    note = false,
    horizontal = true,
    disabled = false,
    ...prop
  } = props;
  const keyObject = Object?.keys(options?.[0]);
  const { field } = useController({
    name,
    control,
    defaultValue: options?.[0][keyObject[0]],
  });
  return (
    <>
      <div
        className="mt-3"
        // className={`flex relative ${
        //   horizontal
        //     ? "justify-content-start align-items-center"
        //     : "flex-column gap-1"
        // }`}
      >
        <label
          className={`${horizontal ? "col-4" : ""} p-0 text-sm font-[600]`}
          htmlFor="value"
        >
          {label} {note ? <span className="ml-1 text-[red]">(*)</span> : ""}
        </label>
        <Dropdown
          value={field.value}
          disabled={disabled}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
          filter={filter}
          options={options}
          editable={true}
          optionValue={keyObject[0]}
          optionLabel={keyObject[1]}
          className={"w-full border-3"}
        />
      </div>
    </>
  );
};

export default InputSelectedObject;
