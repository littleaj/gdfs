import { AuthConfig } from "../@types/AuthConfig";
import { TokenClient, TokenResponse } from "../@types/gis";
import { AUTH_CONFIG } from "../hooks/config";

export function createTokenClient(): TokenClient {
  validateAuthConfig("client_id", "api_key");

  console.log("Creating auth client...");
  return google.accounts.oauth2.initTokenClient({
    client_id: AUTH_CONFIG.client_id,
    scope: AUTH_CONFIG.scopes,
    callback: handleTokenResponse,
    error_callback: (err) => {
      console.error("Authentication error: ", err.message);
    }
  });
}

async function initializeApiClient(): Promise<void> {
  return gapi.client.init({
    apiKey: AUTH_CONFIG.api_key,
    discoveryDocs: [AUTH_CONFIG.discovery_doc],
  });
}

function validateAuthConfig(...requiredKeys: (keyof AuthConfig)[]) {
  requiredKeys.forEach(key => {
    if (!AUTH_CONFIG[key]) {
      throw new ReferenceError(`${key} is not defined`);
    }
  });
}

function handleTokenResponse(resp: TokenResponse) {
  const success: boolean = !!resp?.access_token;
  console.log("Auth success: ", success);
  if (!success) {
    const err = {
      code: resp.error ?? "UNKNOWN_ERROR",
      description: resp.error_description ?? "...",
      uri: resp.error_uri ?? "",
    };
    const errorMessage = `${err.code}: ${err.description} <${err.uri}>`;
    console.error("TC callback error! ", errorMessage);
    throw new Error(errorMessage);
  }
}

export function loginHandler(tokenClient: TokenClient) {
  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    console.log("Requesting consent...");
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    console.log("auth: empty prompt...");
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: "" });
  }
}

export function logoutHandler() {
  const token = gapi.client.getToken();
  if (token) {
    google.accounts.oauth2.revoke(token.access_token, () => {
      console.log("session token revoked");
    });
    gapi.client.setToken(null);
  }
}

export async function loadGoogleApis(): Promise<void> {
  return new Promise<void>((resolve) => {
    gapi.load("client", () => resolve(initializeApiClient()));
  });
}

