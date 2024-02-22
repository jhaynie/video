import { twMerge } from "tailwind-merge";
import { SyntheticEvent } from "react";

export function cn(...classes: (string | boolean | undefined)[]) {
  return twMerge(classes.filter(Boolean) as string[]);
}

function getTimeComponents(seconds: number, guide = seconds) {
  seconds = seconds < 0 ? 0 : seconds;
  const s = Math.floor(seconds % 60);
  const m = Math.floor((seconds / 60) % 60);
  const h = Math.floor(seconds / 3600);
  const gm = Math.floor((guide / 60) % 60);
  const gh = Math.floor(guide / 3600);
  return {
    s,
    m,
    h,
    gm,
    gh,
  };
}

export function formatTime(seconds: number, guide = seconds) {
  const { s, m, h, gm, gh } = getTimeComponents(seconds, guide);

  // handle invalid times
  if (isNaN(seconds) || seconds === Infinity) {
    // '-' is false for all relational operators (e.g. <, >=) so this setting
    // will add the minimum number of fields specified by the guide
    return "";
  }

  // Check if we need to show hours
  const hd = h > 0 || gh > 0 ? h + ":" : "";

  // If hours are showing, we may need to add a leading zero.
  // Always show at least one digit of minutes.
  const md = ((h || gm >= 10) && m < 10 ? "0" + m : m) + ":";

  // Check if leading zero is need for seconds
  const sd = s < 10 ? "0" + s : s;

  return hd + md + sd;
}

export function formatDuration(seconds: number, guide = seconds) {
  // handle invalid times
  if (isNaN(seconds) || seconds === Infinity) {
    // '-' is false for all relational operators (e.g. <, >=) so this setting
    // will add the minimum number of fields specified by the guide
    return "";
  }
  const { s, m, h, gm, gh } = getTimeComponents(seconds, guide);

  // Check if we need to show hours
  const hd = h > 0 || gh > 0 ? h + "hour" + (h > 1 ? "s " : " ") : "";

  // If hours are showing, we may need to add a leading zero.
  // Always show at least one digit of minutes.
  const md = ((h || gm >= 10) && m < 10 ? "0" + m : m) + " min ";

  // Check if leading zero is need for seconds
  const sd = s < 10 ? "0" + s : s;

  return hd + md + sd + " sec";
}

function clamp(number: number, min: number, max: number) {
  return Math.min(max, Math.max(min, isNaN(number) ? min : number));
}

export function percentify(time: number, end: number) {
  return clamp((time / end) * 100, 0, 100).toFixed(2) + "%";
}

export function offsetLeft(time: number, end: number, width: number) {
  return (width / end) * time;
}

export function createStopEvent<T extends SyntheticEvent>(
  fn: (event: T) => void
) {
  return (event: T) => {
    fn(event);
    event.stopPropagation();
    event.preventDefault();
  };
}
