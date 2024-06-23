import {http} from "msw";
import {getUserResolver} from "./resolvers/getUserResolver";
import {sendCodeResolver} from "./resolvers/sendCodeResolver";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const handlers = [
  http.post(`${backendUrl}/get-user`, getUserResolver),
  http.post(`${backendUrl}/send-code`, sendCodeResolver),
];
