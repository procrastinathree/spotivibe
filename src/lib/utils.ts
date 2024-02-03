import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  const suffixes = ["", "K", "M", "B", "T"];

  const format = (value: number, decimalPlaces: number): string => {
    const factor = Math.pow(10, decimalPlaces);
    return (Math.round(value * factor) / factor).toFixed(decimalPlaces);
  };

  let index = 0;
  while (num >= 1000 && index < suffixes.length - 1) {
    num /= 1000;
    index++;
  }

  const formattedNumber = num >= 10 ? format(num, 0) : format(num, 1);

  return formattedNumber + suffixes[index];
}

export function millisecondsToDuration(milliseconds: number): string {
  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate minutes and seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format the duration as MM:SS
  const formattedDuration = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return formattedDuration;
}