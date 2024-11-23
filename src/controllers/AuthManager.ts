import ApiManager from "./ApiManager";

export default interface AuthManager {
  loggedIn: boolean;
  login(): Promise<void>;
  logout(): Promise<void>;
}