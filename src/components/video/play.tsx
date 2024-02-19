import { MouseEvent } from "react";
import { cn, formatDuration } from "./util";

const Play = ({
  playing,
  onClick,
  duration,
}: {
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
              ></path>
            </svg>
          ) : (
            <svg viewBox="0 0 90 90" fill="none">
              <path
                fill="#1c3fff"
                opacity="0.3"
                d="M45 90C69.8529 90 90 69.8527 90 44.9999C90 20.1471 69.8529 0 45 0C20.1472 0 0 20.1471 0 44.9999C0 69.8527 20.1472 90 45 90Z"
              ></path>
              <path
                fill="#1c3fff"
                d="M45 85C67.0914 85 85 67.0913 85 44.9999C85 22.9086 67.0914 5 45 5C22.9086 5 5 22.9086 5 44.9999C5 67.0913 22.9086 85 45 85Z"
              ></path>
              <path
                d="M35 33.268V56.732C35 58.5212 37.0582 59.6083 38.6432 58.6344L57.8999 46.9025C59.3667 46.0192 59.3667 43.9808 57.8999 43.0749L38.6432 31.3656C37.0582 30.3917 35 31.4788 35 33.268Z"
                fill="white"
                opacity="0.7"
              ></path>
            </svg>
          )}
        </div>
        <div
          className={cn(
            "rounded-full bg-black text-white p-2 flex items-center justify-center text-xs",
            playing && "invisible"
          )}
        >
          {formatDuration(duration)}
        </div>
      </div>
    </div>
  );
};

export default Play;
