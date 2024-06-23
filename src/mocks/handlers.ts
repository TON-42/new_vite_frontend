import {http} from "msw";
import {getUserResolver} from "./getUserResolver";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const handlers = [http.post(`${backendUrl}/get-user`, getUserResolver)];
