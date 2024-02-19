import {
  useEffect,
  useState,
  forwardRef,
  useRef,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { formatTime, offsetLeft, cn, percentify } from "./util";
import { isEmojiReaction, Reaction } from "./types";

function useThrottle(value: any, interval = 500) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdated = useRef<number | null>(null);

  useEffect(() => {
    const now = Date.now();

    if (lastUpdated.current && now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const id = window.setTimeout(() => {
        lastUpdated.current = now;
        setThrottledValue(value);
      }, interval);

      return () => window.clearTimeout(id);
    }
  }, [value, interval]);

  return throttledValue;
}

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
        onMouse = (e: MouseEvent) => {
          const toolDiv = iref.current as HTMLDivElement;
          const divWidth = toolDiv.offsetWidth ?? 0;
          const divHeight = toolDiv.offsetHeight ?? 0;
          setX(e.pageX - (divWidth ? divWidth / 2 : 0) + offsetX);
          setY(e.pageY - (divHeight + offsetY));
          onOver?.(e);
          e.stopPropagation();
          e.preventDefault();
        };
        onMouseEnter = (e: MouseEvent) => {
          setShow(true);
          e.stopPropagation();
          e.preventDefault();
        };
        onMouseOut = (e: MouseEvent) => {
          setShow(false);
          e.stopPropagation();
          e.preventDefault();
        };
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

const ExitFullscreenButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div
      className="h-6 w-6 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 15.556a1 1 0 011-1h2.667a2.778 2.778 0 012.777 2.777V20a1 1 0 01-2 0v-2.667a.778.778 0 00-.777-.777H4a1 1 0 01-1-1zM8.444 3a1 1 0 011 1v2.667a2.778 2.778 0 01-2.777 2.777H4a1 1 0 110-2h2.667a.778.778 0 00.777-.777V4a1 1 0 011-1zM21 15.556a1 1 0 00-1-1h-2.667a2.778 2.778 0 00-2.777 2.777V20a1 1 0 002 0v-2.667a.778.778 0 01.777-.777H20a1 1 0 001-1zM15.556 3a1 1 0 00-1 1v2.667a2.778 2.778 0 002.777 2.777H20a1 1 0 100-2h-2.667a.778.778 0 01-.777-.777V4a1 1 0 00-1-1z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};

const MutedButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div
      className="h-6 w-6 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.533 5.099A1 1 0 0112.1 6v12.6a1 1 0 01-1.625.78L6.25 16H3a1 1 0 01-1-1V9.6a1 1 0 011-1h3.25l4.225-3.38a1 1 0 011.058-.121zM10.1 8.08l-2.875 2.3a1 1 0 01-.625.219H4V14h2.6a1 1 0 01.625.22l2.875 2.3V8.08zM21.707 9.293a1 1 0 010 1.414l-5.143 5.143a1 1 0 01-1.414-1.414l5.143-5.143a1 1 0 011.414 0z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.15 9.293a1 1 0 011.414 0l5.143 5.143a1 1 0 01-1.414 1.414l-5.143-5.143a1 1 0 010-1.414z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};

const PauseButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div
      className="h-6 w-6 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.188 5C6.979 5 6 5.98 6 7.188v9.625a2.188 2.188 0 004.375 0V7.188C10.375 5.979 9.395 5 8.187 5zm7.874 0c-1.208 0-2.187.98-2.187 2.188v9.625a2.188 2.188 0 004.375 0V7.188C18.25 5.979 17.27 5 16.062 5z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};

const PlayButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div
      className="h-6 w-6 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M6 6.134v11.732c0 .895 1.03 1.438 1.822.951l9.628-5.866c.733-.441.733-1.46 0-1.914L7.822 5.183C7.029 4.696 6 5.239 6 6.134z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};

const RestartButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div
      className="h-6 w-6 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.78306 0.566915C7.31653 0.709856 7.63311 1.25819 7.49017 1.79166L6.7049 4.72234C8.49852 3.41365 10.6667 2.85091 12.7825 3.03412C13.6117 3.10538 14.4088 3.28907 15.1584 3.56987C16.328 4.00704 17.4249 4.69588 18.3654 5.63641C19.2011 6.47209 19.8381 7.43123 20.2764 8.45511C20.7432 9.54315 21.0017 10.7418 21.0017 12.0007C21.0017 13.3939 20.6851 14.7132 20.12 15.8906C19.818 16.5208 19.4384 17.1231 18.9812 17.6833C18.5894 18.1639 18.1489 18.6034 17.6673 18.994C17.1314 19.4292 16.5572 19.7936 15.9571 20.0872C14.7632 20.6723 13.4208 21.0007 12.0017 21.0007C10.6825 21.0007 9.42964 20.7169 8.30077 20.207C7.44004 19.8191 6.62781 19.2888 5.89965 18.6163C4.11775 16.9719 3.00171 14.6166 3.00171 12.0007C3.00171 11.4484 3.44942 11.0007 4.00171 11.0007C4.55399 11.0007 5.00171 11.4484 5.00171 12.0007C5.00171 13.9336 5.78509 15.6835 7.05166 16.9502C7.1301 17.0287 7.21 17.1048 7.29116 17.1787C7.81679 17.6572 8.41556 18.0567 9.06872 18.3585C11.0182 19.2575 13.296 19.2122 15.2124 18.2226C15.5894 18.0277 15.9463 17.7995 16.2795 17.542C16.5127 17.3614 16.7372 17.1642 16.9512 16.9501C17.1573 16.744 17.3479 16.5282 17.523 16.3042C17.8046 15.9434 18.0516 15.5543 18.2591 15.1418C19.1888 13.2906 19.2453 11.113 18.4285 9.22207C17.6657 7.46001 16.1994 6.07343 14.3837 5.41645C13.8441 5.2216 13.2853 5.09519 12.7208 5.03721C12.4844 5.01308 12.2445 5.00072 12.0017 5.00072C11.9934 5.00072 11.985 5.00062 11.9767 5.00042C10.378 5.00603 8.78084 5.55593 7.48702 6.65011L10.8091 7.54027C11.3426 7.68321 11.6592 8.23155 11.5162 8.76501C11.3733 9.29848 10.825 9.61506 10.2915 9.47212L4.79178 7.99848C4.25832 7.85554 3.94174 7.3072 4.08468 6.77373L5.55832 1.27402C5.70126 0.740555 6.2496 0.423973 6.78306 0.566915ZM6.27535 6.32544L6.28616 6.28507L6.34527 6.34418L6.27535 6.32544Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};

const RewindButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div
      className="h-6 w-6 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.136 11.736a.9.9 0 01-1.272 0l-3.6-3.6a.9.9 0 010-1.272l3.6-3.6a.9.9 0 111.272 1.272L5.173 7.5l2.963 2.964a.9.9 0 010 1.272z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.636 11.736a.9.9 0 01-1.272 0l-3.6-3.6a.9.9 0 010-1.272l3.6-3.6a.9.9 0 011.272 1.272L9.673 7.5l2.963 2.964a.9.9 0 010 1.272z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.894 6.618c-.275.007-.507.013-.694.013a.9.9 0 000 1.8c.211 0 .467-.007.737-.013l.107-.003c.314-.007.653-.015 1-.015.706 0 1.39.031 1.91.134a5.405 5.405 0 012.765 1.474 5.38 5.38 0 011.17 5.867 5.388 5.388 0 01-1.988 2.417 5.41 5.41 0 01-3.001.908.9.9 0 000 1.8 7.21 7.21 0 004-1.21A7.17 7.17 0 0017.99 8.734a7.205 7.205 0 00-3.687-1.965c-.702-.14-1.533-.17-2.26-.169-.37 0-.728.008-1.044.016l-.106.002z"
          fill="currentColor"
        ></path>
        <path
          d="M3 18.621C3.103 19.866 4.343 21 6.15 21c1.936 0 3.15-1.244 3.15-2.733 0-1.659-1.2-2.634-2.866-2.634-.594 0-1.24.195-1.6.548l.516-2h3.537V12.9H4.304L3.27 16.889l1.459.5c.297-.317.8-.549 1.394-.549.852 0 1.614.488 1.614 1.464 0 .878-.71 1.44-1.588 1.44-.968 0-1.627-.635-1.691-1.477L3 18.621z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};

const ForwardButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div
      className="h-6 w-6 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.464 3.264a.9.9 0 011.272 0l3.6 3.6a.9.9 0 010 1.272l-3.6 3.6a.9.9 0 11-1.272-1.272L13.427 7.5l-2.963-2.964a.9.9 0 010-1.272z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.964 3.264a.9.9 0 011.272 0l3.6 3.6a.9.9 0 010 1.272l-3.6 3.6a.9.9 0 11-1.272-1.272L17.927 7.5l-2.963-2.964a.9.9 0 010-1.272z"
          fill="currentColor"
        ></path>
        <path
          d="M13.8 18.621C13.903 19.866 15.142 21 16.95 21c1.936 0 3.15-1.244 3.15-2.733 0-1.659-1.2-2.634-2.866-2.634-.594 0-1.24.195-1.6.548l.515-2h3.538V12.9h-4.583l-1.033 3.989 1.459.5c.297-.317.8-.549 1.394-.549.852 0 1.614.488 1.614 1.464 0 .878-.71 1.44-1.588 1.44-.968 0-1.627-.635-1.691-1.477l-1.46.354z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.206 6.618c.275.007.507.013.694.013a.9.9 0 010 1.8c-.211 0-.467-.007-.737-.013l-.107-.003a41.495 41.495 0 00-1-.015c-.706 0-1.39.031-1.91.134a5.405 5.405 0 00-2.765 1.474 5.38 5.38 0 00-1.17 5.867 5.388 5.388 0 001.988 2.417 5.41 5.41 0 003.001.908.9.9 0 010 1.8 7.21 7.21 0 01-4-1.21 7.188 7.188 0 01-2.652-3.224A7.17 7.17 0 015.11 8.733 7.205 7.205 0 018.796 6.77c.702-.14 1.533-.17 2.26-.169.37 0 .728.008 1.044.016l.106.002z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};

const SoundButton = ({
  player,
  volumeSupported,
  onMute,
}: {
  player: any;
  volumeSupported: boolean;
  onMute: (e: MouseEvent<HTMLElement>) => void;
}) => {
  const [volume, setVolume] = useState(player.volume() / 1);
  const onChange = (e: any) => {
    const v = e.currentTarget.value / 100;
    player.volume(v);
    setVolume(v);
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <div className="flex gap-x-4 group-volume">
      <div
        className="h-6 w-6 flex items-center justify-center cursor-pointer"
        onClick={onMute}
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.658 5.293a1 1 0 011.414 0 10 10 0 010 14.141 1 1 0 11-1.415-1.414 8 8 0 000-11.313 1 1 0 010-1.414zm-6.124-.131a1 1 0 01.567.9v12.602a1 1 0 01-1.625.781L6.25 16.064H3a1 1 0 01-1-1v-5.4a1 1 0 011-1h3.25l4.226-3.382a1 1 0 011.058-.12zm-1.433 2.982l-2.876 2.3a1 1 0 01-.625.22H4v3.4h2.6a1 1 0 01.625.219l2.876 2.3v-8.44zm4.38.326a1 1 0 011.414 0 5.5 5.5 0 010 7.778 1 1 0 11-1.415-1.414 3.5 3.5 0 000-4.95 1 1 0 010-1.414z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      {volumeSupported && (
        <input
          type="range"
          className="opacity-0 [.group-volume:hover_&]:opacity-100"
          value={volume * 100}
          onChange={onChange}
        ></input>
      )}
    </div>
  );
};

const FullScreenButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div
      className="h-6 w-6 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 14.556a1 1 0 011 1v2.666a.777.777 0 00.778.778h2.666a1 1 0 110 2H5.778A2.778 2.778 0 013 18.222v-2.666a1 1 0 011-1zM9.444 4a1 1 0 01-1 1H5.778A.778.778 0 005 5.778v2.666a1 1 0 11-2 0V5.778A2.778 2.778 0 015.778 3h2.666a1 1 0 011 1zM20 14.556a1 1 0 00-1 1v2.666a.778.778 0 01-.778.778h-2.667a1 1 0 000 2h2.667A2.778 2.778 0 0021 18.222v-2.666a1 1 0 00-1-1zM14.556 4a1 1 0 001 1h2.666a.778.778 0 01.778.778v2.666a1 1 0 002 0V5.778A2.778 2.778 0 0018.222 3h-2.666a1 1 0 00-1 1z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};

const Comment = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div
      className="h-6 w-6 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <svg width="18" viewBox="0 0 20 19" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.81359 1.81359C2.33453 1.29266 3.04107 1 3.77778 1H16.2222C16.9589 1 17.6655 1.29266 18.1864 1.81359C18.7073 2.33453 19 3.04106 19 3.77778V11.6667C19 12.4034 18.7073 13.1099 18.1864 13.6309C17.6655 14.1518 16.9589 14.4444 16.2222 14.4444H5.96977L2.70711 17.7071C2.42111 17.9931 1.99099 18.0787 1.61732 17.9239C1.24364 17.7691 1 17.4045 1 17V3.77778C1 3.04107 1.29266 2.33453 1.81359 1.81359Z"
          fill="currentColor"
        ></path>
        <path
          d="M3.77778 0.5C2.90846 0.5 2.07474 0.845336 1.46004 1.46004C0.845336 2.07474 0.5 2.90846 0.5 3.77778V17C0.5 17.6067 0.865464 18.1536 1.42597 18.3858C1.98649 18.618 2.63166 18.4897 3.06066 18.0607L6.17688 14.9444H16.2222C17.0915 14.9444 17.9253 14.5991 18.54 13.9844C19.1547 13.3697 19.5 12.536 19.5 11.6667V3.77778C19.5 2.90846 19.1547 2.07474 18.54 1.46004C17.9253 0.845336 17.0915 0.5 16.2222 0.5H3.77778Z"
          stroke="white"
          strokeOpacity="0.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  );
};

const PlaybackButton = ({
  value,
  player,
  playbackRates,
  onShow,
}: {
  value: number;
  player: any;
  playbackRates: number[];
  onShow: (val: boolean) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const onClick = (e: MouseEvent) => {
    setShow((v) => !v);
    e.stopPropagation();
    e.preventDefault();
  };
  useEffect(() => onShow(show), [show]);
  const [rate, setRate] = useState(value);
  const setPlaybackRate = (rate_: number) => {
    player.playbackRate(rate_);
    setRate(rate_);
    setShow(false);
  };
  return (
    <>
      <div
        ref={ref}
        className="h-6 w-6 flex items-center justify-center cursor-pointer text-white font-semibold"
        onClick={onClick}
      >
        <div>{rate === 1 ? 1 : rate.toFixed(1)}</div>
        <div>x</div>
      </div>
      <Tooltip
        manual
        force={show}
        ref={ref}
        offsetY={30}
        offsetX={-80}
        className="p-3 rounded-xl"
      >
        <div className="mb-3 text-xs font-bold">Playback Speed</div>
        <div className="flex items-center justify-center gap-3 cursor-pointer">
          {playbackRates.map((rate_) => (
            <div
              key={rate_}
              onClick={(e) => {
                setPlaybackRate(rate_);
                e.stopPropagation();
                e.preventDefault();
              }}
              className={cn(rate === rate_ && "bg-gray-500 rounded px-2")}
            >
              {rate_ === 1 ? rate_ : rate_.toFixed(1)}x
            </div>
          ))}
        </div>
      </Tooltip>
    </>
  );
};

type ProgressProps = {
  currentTime: number;
  buffered: number;
  duration: number;
  playing: boolean;
  hidden: boolean;
  player: any;
  reactions: Reaction[];
};

const ProgressBar = forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
  const {
    currentTime,
    duration,
    buffered,
    playing,
    player,
    hidden,
    reactions,
  } = props;
  const [time, setTime] = useState(0);
  const div = (ref as any)?.current as HTMLDivElement;
  const onMouse = (e: MouseEvent) => {
    if (e.pageX && div?.offsetWidth) {
      const pct = e.pageX / div.offsetWidth;
      const tv = pct * duration;
      setTime(tv);
    }
  };
  const onClick = (e: MouseEvent) => {
    if (e.pageX && div?.offsetWidth) {
      const pct = e.pageX / div.offsetWidth;
      const tv = pct * duration;
      player.currentTime(tv);
      e.stopPropagation();
      e.preventDefault();
    }
  };
  if (hidden) {
    return null;
  }
  return (
    <>
      <div
        ref={ref}
        className="w-full h-4 bg-transparent left-0 right-0 bottom-10 z-[99999] absolute"
        onClick={onClick}
      ></div>
      <div
        className={cn(
          "transition-opacity duration-300",
          playing && div ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        )}
      >
        {div
          ? reactions.map((reaction) =>
              isEmojiReaction(reaction) ? (
                <div
                  key={reaction.id}
                  className="absolute bottom-[50px] z-[99999] text-sm"
                  style={{
                    left: offsetLeft(reaction.time, duration, div.offsetWidth),
                  }}
                >
                  {reaction.emoji}
                </div>
              ) : (
                <div
                  key={reaction.id}
                  className="absolute bottom-[50px] z-[99999] text-sm"
                  style={{
                    left: offsetLeft(reaction.time, duration, div.offsetWidth),
                  }}
                >
                  <Comment onClick={() => null} />
                </div>
              )
            )
          : null}
      </div>
      <div
        className={cn(
          "h-1 w-full bg-gray-500 absolute left-0 right-0 bottom-12 z-[9999] transition-opacity duration-300",
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        )}
      >
        <div
          className="h-full bg-gray-400 absolute inset-0"
          style={{
            width: percentify(buffered, duration),
          }}
        ></div>
        <div
          className="h-full bg-blue-500 absolute inset-0"
          style={{
            width: percentify(currentTime, duration),
          }}
        ></div>
      </div>
      <Tooltip ref={ref} onOver={onMouse} hidden={hidden}>
        {formatTime(time)}
      </Tooltip>
    </>
  );
});

const Emoji = ({
  children,
  onEmoji,
}: {
  children: string;
  onEmoji: (emoji: string) => void;
}) => {
  return (
    <div
      onClick={(e: MouseEvent) => {
        onEmoji(children);
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {children}
    </div>
  );
};

const ReactionBar = ({
  onEmoji,
  inline,
  onCommentClick,
}: {
  inline?: boolean;
  onEmoji: (emoji: string) => void;
  onCommentClick: () => void;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full",
        !inline && "mt-4"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between max-w-lg px-4 gap-10 text-2xl cursor-pointer mx-6",
          !inline && "border rounded-full"
        )}
      >
        <div className="flex items-center justify-center gap-4">
          <Emoji onEmoji={onEmoji}>👍</Emoji>
          <Emoji onEmoji={onEmoji}>🙌</Emoji>
          <Emoji onEmoji={onEmoji}>😂</Emoji>
          <Emoji onEmoji={onEmoji}>😍</Emoji>
          <Emoji onEmoji={onEmoji}>😮</Emoji>
          <Emoji onEmoji={onEmoji}>👎</Emoji>
        </div>
        <div
          className="flex items-center justify-center text-sm gap-2 p-2"
          onClick={onCommentClick}
        >
          <div className="h-5 w-5 mb-2">
            <svg viewBox="3 0 18 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.778 6A.778.778 0 005 6.778v11.808l1.848-1.849a1 1 0 01.708-.293h10.666a.778.778 0 00.778-.777v-8.89A.778.778 0 0018.222 6H5.778zM3.814 4.814A2.778 2.778 0 015.778 4h12.444A2.778 2.778 0 0121 6.778v8.889a2.778 2.778 0 01-2.778 2.777H7.97l-3.263 3.263A1 1 0 013 21V6.778c0-.737.293-1.443.814-1.964z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="font-bold">Comment</div>
        </div>
      </div>
    </div>
  );
};

const CommentBar = ({
  onComment,
  onCancel,
  currentTime,
}: {
  onComment: (val: string) => void;
  onCancel: () => void;
  currentTime: number;
}) => {
  const [value, setValue] = useState("");
  const onKey = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onCancel();
      setValue("");
      return;
    }
    if (e.key === "Enter" && value) {
      e.preventDefault();
      e.stopPropagation();
      onComment(value);
      setValue("");
      return;
    }
  };
  return (
    <div
      className="bottom-0 left-0 right-0 z-[19999] h-12 bg-black w-full"
      onKeyUp={onKey}
    >
      <div className="flex items-center justify-center w-full h-full p-2 gap-3">
        <input
          autoFocus
          type="text"
          placeholder="Leave a comment..."
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          className="bg-transparent flex-grow py-1 px-4 rounded-full outline-none outline-offset-0 border-blue-800 ring-transparent border-2"
        />
        <div
          className={cn(
            " text-white p-2 px-3 text-xs rounded-full w-max transition-colors duration-300",
            value ? "bg-blue-800 cursor-pointer" : "bg-gray-900 text-gray-500"
          )}
          onClick={() => (value ? onComment(value) : null)}
        >
          Comment at {formatTime(currentTime)}
        </div>
        <div
          className="text-gray-300 text-xs mr-2 cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </div>
      </div>
    </div>
  );
};

const Controls = ({
  player,
  playing,
  ready,
  playbackRates,
  reactions,
  onFullScreen,
  onExitFullScreen,
  onReaction,
}: {
  player: any;
  playing: boolean;
  ready: boolean;
  playbackRates: number[];
  reactions: Reaction[];
  onFullScreen: () => void;
  onExitFullScreen: () => void;
  onReaction: (reaction: Reaction) => void;
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [hideProgress, setHideProgress] = useState(false);
  const [muted, setMuted] = useState(false);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [showComment, setShowComment] = useState(false);
  useEffect(() => {
    if (player) {
      let disconnected = false;
      const timeupdate = () => {
        if (!disconnected) {
          setCurrentTime(player.currentTime());
          setBuffered(player.bufferedEnd());
          setDuration(player.duration());
        }
      };
      player.on("timeupdate", timeupdate);
      return () => {
        disconnected = true;
      };
    }
  }, [player]);
  const onRewind = (e: MouseEvent) => {
    const currentVideoTime = player.currentTime();
    const liveTracker = player.liveTracker;
    const seekableStart =
      liveTracker && liveTracker.isLive() && liveTracker.seekableStart();
    let newTime = 0;
    if (seekableStart && currentVideoTime - 5 <= seekableStart) {
      newTime = seekableStart;
    } else if (currentVideoTime >= 5) {
      newTime = currentVideoTime - 5;
    } else {
      newTime = 0;
    }
    player.currentTime(newTime);
    e.stopPropagation();
    e.preventDefault();
  };
  useEffect(() => {
    if (showComment) {
      player.pause();
    }
  }, [showComment]);
  const onForward = (e: MouseEvent) => {
    const currentVideoTime = player.currentTime();
    const liveTracker = player.liveTracker;
    let newTime = 0;
    const duration =
      liveTracker && liveTracker.isLive()
        ? liveTracker.seekableEnd()
        : player.duration();
    if (currentVideoTime + 5 <= duration) {
      newTime = currentVideoTime + 5;
    } else {
      newTime = duration;
    }
    player.currentTime(newTime);
    e.stopPropagation();
    e.preventDefault();
  };
  const onPause = () => {
    player?.pause();
  };
  const onPlay = () => {
    player?.play();
  };
  const onUnmute = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    player.muted(false);
    setMuted(false);
  };
  const onMute = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    player.muted(true);
    setMuted(true);
  };
  const _onFullScreen = (e: MouseEvent) => {
    onFullScreen();
    e.stopPropagation();
    e.preventDefault();
  };
  const _onExitFullScreen = (e: MouseEvent) => {
    onExitFullScreen();
    e.stopPropagation();
    e.preventDefault();
  };
  const onRestart = () => {
    player.currentTime(0);
    player?.play();
  };
  const onComment = (comment: string) => {
    const time = player.currentTime();
    onReaction({
      id: window.crypto.randomUUID(),
      comment,
      time,
    });
    setShowComment(false);
  };
  const onEmoji = (emoji: string) => {
    const time = player.currentTime();
    const duration = player.duration();
    onReaction({
      id: window.crypto.randomUUID(),
      emoji,
      time,
    });
    const div = progressBarRef.current;
    if (div) {
      const b = div.getBoundingClientRect();
      const top = b.top - 22;
      const left = offsetLeft(time, duration, b.width) - 5;
      const el = document.createElement("div");
      el.innerHTML = emoji;
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
      el.className =
        "absolute z-[999999] text-2xl animate-bounce font-sm opacity-100 transition-opacity duration-500";
      document.body.appendChild(el);
      setTimeout(() => {
        el.style.opacity = "0";
        setTimeout(() => document.body.removeChild(el), 1000);
      }, 500);
    }
  };
  if (!ready) {
    return null;
  }
  const hideControls = !playing && duration === 0;
  const ended = currentTime >= duration;
  const muteSupported = player?.tech_ && player.tech_.featuresMuteControl;
  const volumeSupported = player?.tech_ && player.tech_.featuresVolumeControl;
  return (
    <>
      <ProgressBar
        ref={progressBarRef}
        buffered={buffered}
        currentTime={currentTime}
        duration={duration}
        playing={playing}
        player={player}
        hidden={hideProgress || hideControls}
        reactions={reactions}
      />
      <div className="absolute bottom-0 left-0 right-0 z-[9999] h-12 bg-transparent text-white flex items-center justify-start">
        <div className="absolute bg-black inset-0 z-1 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
        {showComment && (
          <CommentBar
            onCancel={() => setShowComment(false)}
            onComment={onComment}
            currentTime={currentTime}
          />
        )}
        <div
          className={cn(
            "absolute inset-0 z-2 group w-full flex justify-between",
            hideControls ? "invisible" : "visible"
          )}
        >
          <div
            className={cn(
              "p-4 w-full flex items-center justify-start gap-x-4 transition-opacity duration-300",
              playing ? "opacity-0 group-hover:opacity-100 " : "opacity-100"
            )}
          >
            {ended ? (
              <RestartButton onClick={onRestart} />
            ) : playing ? (
              <PauseButton onClick={onPause} />
            ) : (
              <PlayButton onClick={onPlay} />
            )}
            <RewindButton onClick={onRewind} />
            <ForwardButton onClick={onForward} />
            {muted && muteSupported ? (
              <MutedButton onClick={onUnmute} />
            ) : (
              <SoundButton
                onMute={onMute}
                player={player}
                volumeSupported={volumeSupported}
              />
            )}
          </div>
          {playing && (
            <div
              className={cn(
                "p-4 w-full flex items-center justify-center gap-x-4",
                playing ? "opacity-0 group-hover:opacity-100 " : "opacity-100"
              )}
            >
              {document.fullscreenElement ? (
                <div>
                  <ReactionBar
                    inline
                    onEmoji={onEmoji}
                    onCommentClick={() => setShowComment((v) => !v)}
                  />
                </div>
              ) : (
                <>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </>
              )}
            </div>
          )}
          <div
            className={cn(
              "p-4 w-full flex items-center justify-end gap-x-4 opacity-0",
              playing ? "opacity-0 group-hover:opacity-100 " : "opacity-100"
            )}
          >
            <PlaybackButton
              value={player?.playbackRate() ?? 1}
              player={player}
              playbackRates={playbackRates}
              onShow={(val) => setHideProgress(val)}
            />
            {document.fullscreenElement ? (
              <ExitFullscreenButton onClick={_onExitFullScreen} />
            ) : (
              <FullScreenButton onClick={_onFullScreen} />
            )}
          </div>
        </div>
      </div>
      {!document.fullscreenElement && (
        <ReactionBar
          onEmoji={onEmoji}
          onCommentClick={() => setShowComment((v) => !v)}
        />
      )}
    </>
  );
};

export default Controls;
