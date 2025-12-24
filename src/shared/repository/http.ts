import axios from "axios";

const baseURL = import.meta.env.VITE_OMDB_BASE_URL ?? "https://www.omdbapi.com/";
const apiKey = import.meta.env.VITE_OMDB_API_KEY;

if (!apiKey) {
  throw new Error("Missing VITE_OMDB_API_KEY. Add it to .env.local");
}

export const omdbHttp = axios.create({
  baseURL,
  timeout: 15000,
  params: {
    apikey: apiKey,
  },
});
