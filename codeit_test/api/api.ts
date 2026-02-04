import axios from "axios";

export const api = axios.create({
  baseURL: "https://assignment-todolist-api.vercel.app/api",
});
