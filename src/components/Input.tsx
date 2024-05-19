import { ChangeEvent, HTMLInputTypeAttribute } from "react";

export type InputFieldProps = {
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
  placeholder?: string;
  setValue: (value: string) => void;
};
export const InputField = ({
  name,
  type,
  value,
  placeholder,
  setValue,
}: InputFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <label htmlFor={name}>{name}</label>
      <input
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        id={name}
      />
    </>
  );
};
