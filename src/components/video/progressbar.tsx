import { forwardRef, MouseEvent, useState } from "react";
import Tooltip from "./tooltip";
import { isEmojiReaction, Reaction } from "./types";
import {
  createStopEvent,
  formatTime,
  percentify,
  cn,
  offsetLeft,
} from "./util";
import { CommentButton } from "./buttons";

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
  const onClick = createStopEvent((e: MouseEvent) => {
    if (e.pageX && div?.offsetWidth) {
      const pct = e.pageX / div.offsetWidth;
      const tv = pct * duration;
      player.currentTime(tv);
    }
  });
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
                  <CommentButton onClick={() => null} />
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

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
