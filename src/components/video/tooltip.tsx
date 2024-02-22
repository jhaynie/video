import { useState, useEffect, MouseEvent, useRef, forwardRef } from "react";
import useThrottle from "./useThrottle";
import { cn, createStopEvent } from "./util";

type TooltipProps = {
  className?: string;
  children: React.ReactNode;
  offsetY?: number;
  offsetX?: number;
  force?: boolean;
  manual?: true;
  hidden?: boolean;
  onOver?: (e: MouseEvent) => void;
};

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const [show, setShow] = useState(false);
  const [_x, setX] = useState(0);
  const [_y, setY] = useState(0);
  const x = useThrottle(_x, 200);
  const y = useThrottle(_y, 200);
  const iref = useRef<HTMLDivElement>(null);
  const {
    offsetY = 0,
    offsetX = 0,
    children,
    force,
    onOver,
    hidden,
    className,
    manual,
  } = props;
  useEffect(() => {
    const el = (ref as any)?.current;
    if (el) {
      let onMouse: (e: MouseEvent) => void;
      let onMouseEnter: (e: MouseEvent) => void;
      let onMouseOut: (e: MouseEvent) => void;
      if (!manual) {
        onMouse = createStopEvent((e: MouseEvent) => {
          const toolDiv = iref.current as HTMLDivElement;
          const divWidth = toolDiv.offsetWidth ?? 0;
          const divHeight = toolDiv.offsetHeight ?? 0;
          setX(e.pageX - (divWidth ? divWidth / 2 : 0) + offsetX);
          setY(e.pageY - (divHeight + offsetY));
          onOver?.(e);
        });
        onMouseEnter = createStopEvent(() => setShow(true));
        onMouseOut = createStopEvent(() => setShow(false));
        el.addEventListener("mousemove", onMouse);
        el.addEventListener("mouseover", onMouseEnter);
        el.addEventListener("mouseout", onMouseOut);
      } else {
        const div = el as HTMLDivElement;
        const b = div.getBoundingClientRect();
        const toolDiv = iref.current as HTMLDivElement;
        const divWidth = toolDiv.offsetWidth ?? 0;
        const divHeight = toolDiv.offsetHeight ?? 0;
        setX(b.x - (divWidth ? divWidth / 2 : 0) + offsetX);
        setY(b.y - (divHeight + offsetY));
      }
      return () => {
        const current = (ref as any).current;
        if (current && !manual) {
          current.removeEventListener("mousemove", onMouse);
          current.removeEventListener("mouseover", onMouseEnter);
          current.removeEventListener("mouseout", onMouseOut);
        }
      };
    }
  }, [force, onOver, manual, offsetY, offsetX, ref, iref]);
  return (
    <div
      ref={iref}
      className={cn(
        "min-h-fit w-max fixed bg-gray-800 z-[999980] text-white text-sm px-2 py-1 rounded",
        className
      )}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        visibility: (show || force === true) && !hidden ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
