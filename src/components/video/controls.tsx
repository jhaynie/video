import { useEffect, useState, useRef, KeyboardEvent } from "react";
import { formatTime, offsetLeft, cn, createStopEvent } from "./util";
import { Reaction } from "./types";
import Icon from "./icon";
import ProgressBar from "./progressbar";
import {
  EmojiButton,
  RewindButton,
  ForwardButton,
  FullScreenButton,
  SoundButton,
  MutedButton,
  ExitFullscreenButton,
  RestartButton,
  PlaybackButton,
  PauseButton,
  PlayButton,
} from "./buttons";

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
          <EmojiButton onEmoji={onEmoji}>👍</EmojiButton>
          <EmojiButton onEmoji={onEmoji}>🙌</EmojiButton>
          <EmojiButton onEmoji={onEmoji}>😂</EmojiButton>
          <EmojiButton onEmoji={onEmoji}>😍</EmojiButton>
          <EmojiButton onEmoji={onEmoji}>😮</EmojiButton>
          <EmojiButton onEmoji={onEmoji}>👎</EmojiButton>
        </div>
        <div
          className="flex items-center justify-center text-sm gap-2 p-2"
          onClick={onCommentClick}
        >
          <Icon className="mb-2">
            <svg viewBox="3 0 18 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.778 6A.778.778 0 005 6.778v11.808l1.848-1.849a1 1 0 01.708-.293h10.666a.778.778 0 00.778-.777v-8.89A.778.778 0 0018.222 6H5.778zM3.814 4.814A2.778 2.778 0 015.778 4h12.444A2.778 2.778 0 0121 6.778v8.889a2.778 2.778 0 01-2.778 2.777H7.97l-3.263 3.263A1 1 0 013 21V6.778c0-.737.293-1.443.814-1.964z"
                fill="currentColor"
              />
            </svg>
          </Icon>
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
          onClick={() => (value ? onComment(value) : void 0)}
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
  const onRewind = createStopEvent(() => {
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
  });
  useEffect(() => {
    if (showComment) {
      player.pause();
    }
  }, [showComment]);
  const onForward = createStopEvent(() => {
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
  });
  const onPause = () => player?.pause();
  const onPlay = () => player?.play();
  const onUnmute = createStopEvent(() => {
    player.muted(false);
    setMuted(false);
  });
  const onMute = createStopEvent(() => {
    player.muted(true);
    setMuted(true);
  });
  const _onFullScreen = createStopEvent(() => onFullScreen());
  const _onExitFullScreen = createStopEvent(() => onExitFullScreen());
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
  const isFullScreen = document.fullscreenElement;
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
              {isFullScreen ? (
                <div>
                  <ReactionBar
                    inline
                    onEmoji={onEmoji}
                    onCommentClick={() => setShowComment((v) => !v)}
                  />
                </div>
              ) : duration ? (
                <>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </>
              ) : null}
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
            {isFullScreen ? (
              <ExitFullscreenButton onClick={_onExitFullScreen} />
            ) : (
              <FullScreenButton onClick={_onFullScreen} />
            )}
          </div>
        </div>
      </div>
      {!isFullScreen && (
        <ReactionBar
          onEmoji={onEmoji}
          onCommentClick={() => setShowComment((v) => !v)}
        />
      )}
    </>
  );
};

export default Controls;
