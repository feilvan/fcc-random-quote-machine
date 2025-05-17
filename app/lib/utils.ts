import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Quote } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getQuote(): Promise<Quote> {
  const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
    method: "GET",
    headers: {
      "X-Api-Key": import.meta.env.VITE_API_KEY,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  // Assuming the API returns an array of quotes, return the first one
  return data[0] as Quote;
}
