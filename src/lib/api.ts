import axios from "axios";
import { env } from "./env";

export const api = axios.create({
  baseURL: env("CLIENT_API_URL"),
  withCredentials: true,
});
