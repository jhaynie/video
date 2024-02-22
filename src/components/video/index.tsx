"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Controls from "./controls";
import { LargePlayButton } from "./buttons";
import type { Reaction } from "./types";
import { createStopEvent } from "./util";

type VideoProps = {
  autoplay?: boolean;
  sources: {
    src: string;
    type: string;
  }[];
  poster?: string;
  onReady?: () => void;
};

const defaultOptions = {
  autoplay: true,
  preload: true,
  controls: false,
  responsive: true,
  fluid: true,
  liveui: false,
  playbackRates: [0.8, 1, 1.2, 1.5, 1.7, 2, 2.5],
  userActions: {
    hotkeys: function (event: any) {
      // `this` is the player in this context
      const player = this as any;
      if (event.key === "k") {
        if (player.paused()) {
          player.play();
        } else {
          player.pause();
        }
      }
    },
  },
};

const Video = ({ autoplay, sources, poster, onReady }: VideoProps) => {
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>([]);

  const options = useMemo(
    () => ({ ...defaultOptions, poster, sources, autoplay }),
    [sources]
  );

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video");
      videoElement.classList.add("video-js", "vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady?.();
      });
      playerRef.current.one("loadedmetadata", () => {
        setDuration(playerRef.current.duration());
        setReady(true);
      });
      playerRef.current.on("ratechange", () =>
        setPlaybackRate(playerRef.current.playbackRate())
      );
      playerRef.current.on("play", () => setPlaying(true));
      playerRef.current.on("pause", () => setPlaying(false));
    } else if (playerRef.current) {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
        setReady(false);
      }
    };
  }, [playerRef]);

  const onClick = createStopEvent(() => {
    if (playing) {
      playerRef.current?.pause();
    } else {
      playerRef.current?.play();
    }
  });

  const onReaction = (reaction: Reaction) =>
    setReactions((reactions) => [...reactions, reaction]);

  const onFullScreen = () => containerRef.current?.requestFullscreen();

  const onExitFullScreen = () => document.exitFullscreen();

  return (
    <div ref={containerRef} className="relative group w-full h-full">
      <div data-vjs-player>
        <div ref={videoRef} />
        <div className="absolute inset-0 bottom-40 z-0" onClick={onClick}></div>
        <LargePlayButton
          onClick={onClick}
          playing={playing}
          duration={duration / playbackRate}
          ready={ready}
        />
        <Controls
          player={playerRef.current}
          playing={playing}
          ready={ready}
          playbackRates={options.playbackRates}
          reactions={reactions}
          onReaction={onReaction}
          onFullScreen={onFullScreen}
          onExitFullScreen={onExitFullScreen}
        />
      </div>
    </div>
  );
};

export default Video;
