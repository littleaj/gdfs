import { throwUninitialized } from "./ServiceUtils";

export default interface AuthService {
  login(): boolean;
  logout(): boolean;
}

export const NULL_AUTH_SERVICE: AuthService = {
  login: () => throwUninitialized(),
  logout: () => throwUninitialized(),
}