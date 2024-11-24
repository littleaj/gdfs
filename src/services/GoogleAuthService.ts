import GoogleAuthConfig from "../model/GoogleAuthConfig";
import AuthService from "./AuthService";

type TokenClient = google.accounts.oauth2.TokenClient;
type ClientConfigError = google.accounts.oauth2.ClientConfigError;
type TokenResponse = google.accounts.oauth2.TokenResponse;

export default class GoogleAuthService implements AuthService {
  readonly #oauth2: GIS;
  readonly #config: GoogleAuthConfig;
  readonly #tokenClient: TokenClient;
  /**
   * space delimited list
   */
  private static readonly SCOPES: string = 
    "https://www.googleapis.com/auth/drive.file";

  constructor(oauth2: GIS, config: GoogleAuthConfig) {
    this.#oauth2 = oauth2;
    this.#config = config;
    this.#tokenClient = this.#oauth2.initTokenClient({
      client_id: this.#config.client_id,
      error_callback: this.#onTokenError,
      callback: this.#onTokenResponse,
      scope: GoogleAuthService.SCOPES
    });
  }

  #onTokenError(error: ClientConfigError): void {
    // TODO
    console.error("Error response from token client: ", error);
  }

  #onTokenResponse(response: TokenResponse): void {
    // TODO
    console.log("Token response: ", response);
  }

  login(): void {
    console.log("Logging in...");
    this.#tokenClient.requestAccessToken({prompt: "consent"}); // TODO this should change if has token
  }
  logout(): void {
    throw new Error("Method not implemented.");
  }
}