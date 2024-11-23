import AuthManager from "./AuthManager";

export default class GoogleAuthManager implements AuthManager {
  #loggedIn: boolean = false;

  

  get loggedIn() {
    return this.#loggedIn;
  }

  login(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}