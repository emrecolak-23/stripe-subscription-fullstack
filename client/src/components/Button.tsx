import { FC } from "react";
import { cn } from "../utils/cn";

interface ButtonProps {
  text: string;
  type?: "primary" | "secondary" | "danger" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
  handleClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  type,
  size = "md",
  text = "Submit",
  className,
  handleClick,
  disabled,
}) => {
  const buttonClasses = cn(
    "rounded-md",
    "px-3",
    "py-2",
    "text-sm",
    "font-medium",
    className,
    {
      "bg-blue-500": type === "primary",
      "bg-gray-500": type === "secondary",
      "bg-red-500": type === "danger",
      "bg-green-500": type === "success",
      "bg-yellow-500": type === "warning",
      "bg-indigo-500": type === "info",
      "text-white": type === "secondary",
      "text-gray-700": type === "secondary",
      "text-xs": size === "sm",
      "text-sm": size === "md",
      "text-lg": size === "lg",
    }
  );

  return (
    <button disabled={disabled} className={buttonClasses} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
