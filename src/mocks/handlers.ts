import {http} from "msw";
import {getUserResolver} from "./resolvers/getUserResolver";
import {sendCodeResolver} from "./resolvers/sendCodeResolver";
import {loginResolver} from "./resolvers/loginResolver";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const handlers = [
  http.post(`${backendUrl}/get-user`, getUserResolver),
  http.post(`${backendUrl}/send-code`, sendCodeResolver),
  http.post(`${backendUrl}/login`, loginResolver),
];
