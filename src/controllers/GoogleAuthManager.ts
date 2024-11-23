import { createObservableDelegate, ObservableDelegate, ObservableFacade } from "../model/ObservableDelegate";
import { Action } from "../model/Operation";
import { AuthManager } from "./AuthManager";

export default class GoogleAuthManager implements ObservableFacade<AuthManager> {
  #loggedIn: boolean = false;
  #client: GIS;

  public readonly login: ObservableDelegate<AuthManager["login"]>;
  public readonly logout: ObservableDelegate<AuthManager["logout"]>;

  constructor(client: GIS) {
    this.#client = client;
    this.login = createObservableDelegate<Action>(() => {
      // IMPLEMENT
      return {
        success: true,
      };
    });

    this.logout = createObservableDelegate<Action>(() => {
      // IMPLEMENT
      return {
        success: true,
      }
    });

  }

  get loggedIn() {
    return this.#loggedIn;
  }
}