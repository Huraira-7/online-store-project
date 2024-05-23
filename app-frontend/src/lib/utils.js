import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function splitIntoChunks(arr,chunkSize){ //splits arrays into chunk arrays of given length
  const chunks = [];
  let rem = arr.slice();
  while(rem.length>0){
    const chunk = rem.splice(0,Math.min(chunkSize,rem.length));
    chunks.push(chunk);
  }
  return chunks;
}

export function capitalize(string) {  return string.charAt(0).toUpperCase() + string.slice(1); }