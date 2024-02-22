import { ReactNode, forwardRef, MouseEvent } from "react";
import { cn } from "./util";

type IconProps = {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
};

const Icon = forwardRef<HTMLDivElement, IconProps>((props, ref) => {
  const { children, onClick, className } = props;
  return (
    <div
      ref={ref}
      className={cn(
        "h-6 w-6 flex items-center justify-center cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
});

Icon.displayName = "Icon";

export default Icon;
