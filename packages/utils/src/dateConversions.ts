import { format } from "timeago.js";

// TIME IN MS
const oneSecond = 1000;
const oneMinute = oneSecond * 60;
export const oneHour = oneMinute * 60;

export function getUTCDateAndTimeString(date: Date): string {
  const d = getUTCDateString(date);
  const t = `${getUTCTimeString(date)}:${zeroPadNumber(date.getUTCSeconds())}`;
  return `${d} ${t}`;
}

export function getDateString(date: Date): string {
  const month = zeroPadNumber(date.getMonth() + 1); // January is 0
  const day = zeroPadNumber(date.getDate());
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export function getUTCDateString(date: Date): string {
  const month = zeroPadNumber(date.getUTCMonth() + 1); // January is 0
  const day = zeroPadNumber(date.getUTCDate());
  const year = date.getUTCFullYear();
  return `${year}-${month}-${day}`;
}

export function getUTCTimeString(date: Date): string {
  const hour = date.getUTCHours();
  const mins = date.getUTCMinutes();
  return `${zeroPadNumber(hour)}:${zeroPadNumber(mins)}`;
}

function zeroPadNumber(num: number): string {
  if (num < 10) {
    return `0${num}`;
  }
  return String(num);
}

export function getNow(): Date {
  return new Date(Date.now());
}

export function getDateMinusHours(date: Date, hours: number): Date {
  if (hours === 0) return date;
  date.setHours(date.getHours() - hours);
  return date;
}

export function getUTCNowDateString(): string {
  return getUTCDateString(getNow());
}

// Gets local time in format "M/DD/YYYY, HH:MM [AM|PM]"
export function getLongDateTimeString(d: Date): string {
  const [date, time, period] = d.toLocaleString().split(" ");
  const per = period ? ` ${period}` : "";
  return `${date} ${time.slice(0, -3)}${per}`;
}

function getTime(date: Date): string {
  const hour = zeroPadNumber(date.getHours());
  const mins = zeroPadNumber(date.getMinutes());
  return `${hour}:${mins}`;
}

export function getTimeWithSeconds(date: Date): string {
  const t = getTime(date);
  return `${t}:${zeroPadNumber(date.getSeconds())}`;
}

export function getTimeAgoString(oldDateTime: number): string {
  return format(new Date(oldDateTime));
}

export function areTimeAgosEqual(a: Date, b: Date): boolean {
  return format(a) === format(b);
}
