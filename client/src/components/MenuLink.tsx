import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";
interface MenuLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const MenuLink: FC<MenuLinkProps> = ({ to, children, className, onClick }) => {
  const menuClasses = cn(
    "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium",
    className
  );

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => {
        return `${menuClasses} ${isActive ? "bg-gray-900" : ""}`;
      }}
    >
      {children}
    </NavLink>
  );
};

export default MenuLink;
