import { MouseEvent, useState, ChangeEvent, useRef, useEffect } from "react";
import Icon from "./icon";
import Tooltip from "./tooltip";
import { cn, createStopEvent, formatDuration } from "./util";

export const ExitFullscreenButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Icon onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 15.556a1 1 0 011-1h2.667a2.778 2.778 0 012.777 2.777V20a1 1 0 01-2 0v-2.667a.778.778 0 00-.777-.777H4a1 1 0 01-1-1zM8.444 3a1 1 0 011 1v2.667a2.778 2.778 0 01-2.777 2.777H4a1 1 0 110-2h2.667a.778.778 0 00.777-.777V4a1 1 0 011-1zM21 15.556a1 1 0 00-1-1h-2.667a2.778 2.778 0 00-2.777 2.777V20a1 1 0 002 0v-2.667a.778.778 0 01.777-.777H20a1 1 0 001-1zM15.556 3a1 1 0 00-1 1v2.667a2.778 2.778 0 002.777 2.777H20a1 1 0 100-2h-2.667a.778.778 0 01-.777-.777V4a1 1 0 00-1-1z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
};

export const MutedButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Icon onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.533 5.099A1 1 0 0112.1 6v12.6a1 1 0 01-1.625.78L6.25 16H3a1 1 0 01-1-1V9.6a1 1 0 011-1h3.25l4.225-3.38a1 1 0 011.058-.121zM10.1 8.08l-2.875 2.3a1 1 0 01-.625.219H4V14h2.6a1 1 0 01.625.22l2.875 2.3V8.08zM21.707 9.293a1 1 0 010 1.414l-5.143 5.143a1 1 0 01-1.414-1.414l5.143-5.143a1 1 0 011.414 0z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.15 9.293a1 1 0 011.414 0l5.143 5.143a1 1 0 01-1.414 1.414l-5.143-5.143a1 1 0 010-1.414z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
};

export const PauseButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Icon onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.188 5C6.979 5 6 5.98 6 7.188v9.625a2.188 2.188 0 004.375 0V7.188C10.375 5.979 9.395 5 8.187 5zm7.874 0c-1.208 0-2.187.98-2.187 2.188v9.625a2.188 2.188 0 004.375 0V7.188C18.25 5.979 17.27 5 16.062 5z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
};

export const PlayButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Icon onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M6 6.134v11.732c0 .895 1.03 1.438 1.822.951l9.628-5.866c.733-.441.733-1.46 0-1.914L7.822 5.183C7.029 4.696 6 5.239 6 6.134z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
};

export const RestartButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Icon onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.78306 0.566915C7.31653 0.709856 7.63311 1.25819 7.49017 1.79166L6.7049 4.72234C8.49852 3.41365 10.6667 2.85091 12.7825 3.03412C13.6117 3.10538 14.4088 3.28907 15.1584 3.56987C16.328 4.00704 17.4249 4.69588 18.3654 5.63641C19.2011 6.47209 19.8381 7.43123 20.2764 8.45511C20.7432 9.54315 21.0017 10.7418 21.0017 12.0007C21.0017 13.3939 20.6851 14.7132 20.12 15.8906C19.818 16.5208 19.4384 17.1231 18.9812 17.6833C18.5894 18.1639 18.1489 18.6034 17.6673 18.994C17.1314 19.4292 16.5572 19.7936 15.9571 20.0872C14.7632 20.6723 13.4208 21.0007 12.0017 21.0007C10.6825 21.0007 9.42964 20.7169 8.30077 20.207C7.44004 19.8191 6.62781 19.2888 5.89965 18.6163C4.11775 16.9719 3.00171 14.6166 3.00171 12.0007C3.00171 11.4484 3.44942 11.0007 4.00171 11.0007C4.55399 11.0007 5.00171 11.4484 5.00171 12.0007C5.00171 13.9336 5.78509 15.6835 7.05166 16.9502C7.1301 17.0287 7.21 17.1048 7.29116 17.1787C7.81679 17.6572 8.41556 18.0567 9.06872 18.3585C11.0182 19.2575 13.296 19.2122 15.2124 18.2226C15.5894 18.0277 15.9463 17.7995 16.2795 17.542C16.5127 17.3614 16.7372 17.1642 16.9512 16.9501C17.1573 16.744 17.3479 16.5282 17.523 16.3042C17.8046 15.9434 18.0516 15.5543 18.2591 15.1418C19.1888 13.2906 19.2453 11.113 18.4285 9.22207C17.6657 7.46001 16.1994 6.07343 14.3837 5.41645C13.8441 5.2216 13.2853 5.09519 12.7208 5.03721C12.4844 5.01308 12.2445 5.00072 12.0017 5.00072C11.9934 5.00072 11.985 5.00062 11.9767 5.00042C10.378 5.00603 8.78084 5.55593 7.48702 6.65011L10.8091 7.54027C11.3426 7.68321 11.6592 8.23155 11.5162 8.76501C11.3733 9.29848 10.825 9.61506 10.2915 9.47212L4.79178 7.99848C4.25832 7.85554 3.94174 7.3072 4.08468 6.77373L5.55832 1.27402C5.70126 0.740555 6.2496 0.423973 6.78306 0.566915ZM6.27535 6.32544L6.28616 6.28507L6.34527 6.34418L6.27535 6.32544Z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
};

export const RewindButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Icon onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.136 11.736a.9.9 0 01-1.272 0l-3.6-3.6a.9.9 0 010-1.272l3.6-3.6a.9.9 0 111.272 1.272L5.173 7.5l2.963 2.964a.9.9 0 010 1.272z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.636 11.736a.9.9 0 01-1.272 0l-3.6-3.6a.9.9 0 010-1.272l3.6-3.6a.9.9 0 011.272 1.272L9.673 7.5l2.963 2.964a.9.9 0 010 1.272z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.894 6.618c-.275.007-.507.013-.694.013a.9.9 0 000 1.8c.211 0 .467-.007.737-.013l.107-.003c.314-.007.653-.015 1-.015.706 0 1.39.031 1.91.134a5.405 5.405 0 012.765 1.474 5.38 5.38 0 011.17 5.867 5.388 5.388 0 01-1.988 2.417 5.41 5.41 0 01-3.001.908.9.9 0 000 1.8 7.21 7.21 0 004-1.21A7.17 7.17 0 0017.99 8.734a7.205 7.205 0 00-3.687-1.965c-.702-.14-1.533-.17-2.26-.169-.37 0-.728.008-1.044.016l-.106.002z"
          fill="currentColor"
        />
        <path
          d="M3 18.621C3.103 19.866 4.343 21 6.15 21c1.936 0 3.15-1.244 3.15-2.733 0-1.659-1.2-2.634-2.866-2.634-.594 0-1.24.195-1.6.548l.516-2h3.537V12.9H4.304L3.27 16.889l1.459.5c.297-.317.8-.549 1.394-.549.852 0 1.614.488 1.614 1.464 0 .878-.71 1.44-1.588 1.44-.968 0-1.627-.635-1.691-1.477L3 18.621z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
};

export const ForwardButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Icon onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.464 3.264a.9.9 0 011.272 0l3.6 3.6a.9.9 0 010 1.272l-3.6 3.6a.9.9 0 11-1.272-1.272L13.427 7.5l-2.963-2.964a.9.9 0 010-1.272z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.964 3.264a.9.9 0 011.272 0l3.6 3.6a.9.9 0 010 1.272l-3.6 3.6a.9.9 0 11-1.272-1.272L17.927 7.5l-2.963-2.964a.9.9 0 010-1.272z"
          fill="currentColor"
        />
        <path
          d="M13.8 18.621C13.903 19.866 15.142 21 16.95 21c1.936 0 3.15-1.244 3.15-2.733 0-1.659-1.2-2.634-2.866-2.634-.594 0-1.24.195-1.6.548l.515-2h3.538V12.9h-4.583l-1.033 3.989 1.459.5c.297-.317.8-.549 1.394-.549.852 0 1.614.488 1.614 1.464 0 .878-.71 1.44-1.588 1.44-.968 0-1.627-.635-1.691-1.477l-1.46.354z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.206 6.618c.275.007.507.013.694.013a.9.9 0 010 1.8c-.211 0-.467-.007-.737-.013l-.107-.003a41.495 41.495 0 00-1-.015c-.706 0-1.39.031-1.91.134a5.405 5.405 0 00-2.765 1.474 5.38 5.38 0 00-1.17 5.867 5.388 5.388 0 001.988 2.417 5.41 5.41 0 003.001.908.9.9 0 010 1.8 7.21 7.21 0 01-4-1.21 7.188 7.188 0 01-2.652-3.224A7.17 7.17 0 015.11 8.733 7.205 7.205 0 018.796 6.77c.702-.14 1.533-.17 2.26-.169.37 0 .728.008 1.044.016l.106.002z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
};

export const SoundButton = ({
  player,
  volumeSupported,
  onMute,
}: {
  player: any;
  volumeSupported: boolean;
  onMute: (e: MouseEvent<HTMLElement>) => void;
}) => {
  const [volume, setVolume] = useState(player.volume() / 1);
  const onChange = createStopEvent<ChangeEvent<HTMLInputElement>>((e) => {
    const v = +e.currentTarget.value / 100;
    player.volume(v);
    setVolume(v);
  });
  return (
    <div className="flex gap-x-4 group-volume">
      <Icon onClick={onMute}>
        <svg viewBox="0 0 24 24" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.658 5.293a1 1 0 011.414 0 10 10 0 010 14.141 1 1 0 11-1.415-1.414 8 8 0 000-11.313 1 1 0 010-1.414zm-6.124-.131a1 1 0 01.567.9v12.602a1 1 0 01-1.625.781L6.25 16.064H3a1 1 0 01-1-1v-5.4a1 1 0 011-1h3.25l4.226-3.382a1 1 0 011.058-.12zm-1.433 2.982l-2.876 2.3a1 1 0 01-.625.22H4v3.4h2.6a1 1 0 01.625.219l2.876 2.3v-8.44zm4.38.326a1 1 0 011.414 0 5.5 5.5 0 010 7.778 1 1 0 11-1.415-1.414 3.5 3.5 0 000-4.95 1 1 0 010-1.414z"
            fill="currentColor"
          />
        </svg>
      </Icon>
      {volumeSupported && (
        <input
          type="range"
          className="opacity-0 [.group-volume:hover_&]:opacity-100"
          value={volume * 100}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export const FullScreenButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Icon onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 14.556a1 1 0 011 1v2.666a.777.777 0 00.778.778h2.666a1 1 0 110 2H5.778A2.778 2.778 0 013 18.222v-2.666a1 1 0 011-1zM9.444 4a1 1 0 01-1 1H5.778A.778.778 0 005 5.778v2.666a1 1 0 11-2 0V5.778A2.778 2.778 0 015.778 3h2.666a1 1 0 011 1zM20 14.556a1 1 0 00-1 1v2.666a.778.778 0 01-.778.778h-2.667a1 1 0 000 2h2.667A2.778 2.778 0 0021 18.222v-2.666a1 1 0 00-1-1zM14.556 4a1 1 0 001 1h2.666a.778.778 0 01.778.778v2.666a1 1 0 002 0V5.778A2.778 2.778 0 0018.222 3h-2.666a1 1 0 00-1 1z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
};

export const CommentButton = ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Icon onClick={onClick}>
      <svg width="18" viewBox="0 0 20 19" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.81359 1.81359C2.33453 1.29266 3.04107 1 3.77778 1H16.2222C16.9589 1 17.6655 1.29266 18.1864 1.81359C18.7073 2.33453 19 3.04106 19 3.77778V11.6667C19 12.4034 18.7073 13.1099 18.1864 13.6309C17.6655 14.1518 16.9589 14.4444 16.2222 14.4444H5.96977L2.70711 17.7071C2.42111 17.9931 1.99099 18.0787 1.61732 17.9239C1.24364 17.7691 1 17.4045 1 17V3.77778C1 3.04107 1.29266 2.33453 1.81359 1.81359Z"
          fill="currentColor"
        />
        <path
          d="M3.77778 0.5C2.90846 0.5 2.07474 0.845336 1.46004 1.46004C0.845336 2.07474 0.5 2.90846 0.5 3.77778V17C0.5 17.6067 0.865464 18.1536 1.42597 18.3858C1.98649 18.618 2.63166 18.4897 3.06066 18.0607L6.17688 14.9444H16.2222C17.0915 14.9444 17.9253 14.5991 18.54 13.9844C19.1547 13.3697 19.5 12.536 19.5 11.6667V3.77778C19.5 2.90846 19.1547 2.07474 18.54 1.46004C17.9253 0.845336 17.0915 0.5 16.2222 0.5H3.77778Z"
          stroke="white"
          strokeOpacity="0.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};

export const PlaybackButton = ({
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
  const [rate, setRate] = useState(value);
  const onClick = (e: MouseEvent) => {
    setShow((v) => !v);
    e.stopPropagation();
    e.preventDefault();
  };
  useEffect(() => onShow(show), [show]);
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
              onClick={createStopEvent(() => setPlaybackRate(rate_))}
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

export const EmojiButton = ({
  children,
  onEmoji,
}: {
  children: string;
  onEmoji: (emoji: string) => void;
}) => {
  return (
    <div onClick={createStopEvent(() => onEmoji(children))}>{children}</div>
  );
};

export const LargePlayButton = ({
  playing,
  onClick,
  duration,
  ready,
}: {
  ready: boolean;
  playing: boolean;
  duration: number;
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <div
      className="absolute z-1 inset-0 bottom-12 flex items-center justify-center"
      onClick={onClick}
    >
      <div className="p-10 space-y-2">
        <div className="h-24 w-24 rounded-full bg-blue-800 text-white cursor-pointer ease-in duration-300 transition-opacity opacity-0 group-hover:opacity-100">
          {playing ? (
            <svg viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.188 5C6.979 5 6 5.98 6 7.188v9.625a2.188 2.188 0 004.375 0V7.188C10.375 5.979 9.395 5 8.187 5zm7.874 0c-1.208 0-2.187.98-2.187 2.188v9.625a2.188 2.188 0 004.375 0V7.188C18.25 5.979 17.27 5 16.062 5z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 90 90" fill="none">
              <path
                fill="#1c3fff"
                opacity="0.3"
                d="M45 90C69.8529 90 90 69.8527 90 44.9999C90 20.1471 69.8529 0 45 0C20.1472 0 0 20.1471 0 44.9999C0 69.8527 20.1472 90 45 90Z"
              />
              <path
                fill="#1c3fff"
                d="M45 85C67.0914 85 85 67.0913 85 44.9999C85 22.9086 67.0914 5 45 5C22.9086 5 5 22.9086 5 44.9999C5 67.0913 22.9086 85 45 85Z"
              />
              <path
                d="M35 33.268V56.732C35 58.5212 37.0582 59.6083 38.6432 58.6344L57.8999 46.9025C59.3667 46.0192 59.3667 43.9808 57.8999 43.0749L38.6432 31.3656C37.0582 30.3917 35 31.4788 35 33.268Z"
                fill="white"
                opacity="0.7"
              />
            </svg>
          )}
        </div>
        <div
          className={cn(
            "rounded-full bg-black text-white p-2 flex items-center justify-center text-xs opacity-100 transition-opacity duration-300",
            (playing || !ready || !duration) && "opacity-0"
          )}
        >
          {formatDuration(duration)}
        </div>
      </div>
    </div>
  );
};
