import { AuthService } from "./AuthService";

export default class GoogleAuthService implements AuthService {
  #client: GIS;

  constructor(client: GIS) {
    this.#client = client;
  }
  login(): boolean {
    throw new Error("Method not implemented.");
  }
  logout(): boolean {
    throw new Error("Method not implemented.");
  }
}