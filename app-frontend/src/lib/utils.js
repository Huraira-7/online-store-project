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

function removeNonLatin1(str) {
  // Regex to match characters outside Latin1 range (anything above \u00FF)
  const regex = /[\u0080-\uFFFF]/g;
  return str.replace(regex, "");
}

export function customBtoA(string){
  const enc = new TextEncoder();
  const data = enc.encode(removeNonLatin1(string));
  const b64 = btoa(String.fromCharCode(...data));
  return b64;
}