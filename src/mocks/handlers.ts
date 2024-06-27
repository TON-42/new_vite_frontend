import {http} from "msw";
import {getUserResolver} from "./resolvers/getUserResolver";
import {sendCodeResolver} from "./resolvers/sendCodeResolver";
import {loginResolver} from "./resolvers/loginResolver";
import {addUserToAgreedResolver} from "./resolvers/addUserToAgreedResolver";
import {sendMessageResolver} from "./resolvers/sendMessageResolver";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const handlers = [
  http.post(`${backendUrl}/get-user`, getUserResolver),
  http.post(`${backendUrl}/send-code`, sendCodeResolver),
  http.post(`${backendUrl}/login`, loginResolver),
  http.post(`${backendUrl}/send-message`, sendMessageResolver),
  http.post(`${backendUrl}/add-user-to-agreed`, addUserToAgreedResolver),
];
