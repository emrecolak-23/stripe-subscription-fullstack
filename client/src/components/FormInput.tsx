import { FC } from "react";
import { Input, CloseButton } from "@mantine/core";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  reset: () => void;
  type: string;
  placeholder?: string;
  className?: string;
}

const FormInput: FC<FormInputProps> = ({
  label,
  value,
  reset,
  onChange,
  onBlur,
  type = "text",
  placeholder = "",
  className,
}) => {
  return (
    <div className="flex flex-col w-full items-start">
      <label>{label}</label>
      <Input
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rightSectionPointerEvents="all"
        mt="md"
        type={type}
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => reset()}
            style={{ display: value ? undefined : "none" }}
          />
        }
      />
    </div>
  );
};

export default FormInput;
