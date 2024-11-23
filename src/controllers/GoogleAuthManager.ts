import { createObservableDelegate, ObservableDelegate, ObservableFacade } from "../model/ObservableDelegate";
import { Action } from "../model/Operation";
import { AuthService } from "./AuthService";

export default class GoogleAuthManager implements ObservableFacade<AuthService> {
  #loggedIn: boolean = false;
  #client: GIS;

  public readonly login: ObservableDelegate<AuthService["login"]>;
  public readonly logout: ObservableDelegate<AuthService["logout"]>;

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