import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthService } from "../@types/AuthService";
import { AuthConfig } from "../@types/AuthConfig";
import _ from "lodash";
import { TokenClient, TokenClientConfig, TokenResponse } from "../@types/gis";
import { AUTH_CONFIG } from "./config";

function createTokenClient(onTokenRequest: TokenClientConfig["callback"]): TokenClient {
  console.log("Creating auth client...");
  return google.accounts.oauth2.initTokenClient({
    client_id: AUTH_CONFIG.client_id,
    scope: AUTH_CONFIG.scopes,
    callback: onTokenRequest,
    error_callback: (err) => {
      console.error("TC ClientConfigError: auth did not complete", err);
    }
  });
}

async function initializeApiClient(): Promise<void> {
  return gapi.client.init({
    clientId: AUTH_CONFIG.client_id,
    discoveryDocs: [AUTH_CONFIG.discovery_doc],
  });
}

async function loadGoogleApi(): Promise<void> {
  return new Promise<void>((resolve) => {
    gapi.load("client", () => resolve(initializeApiClient()));
  });
}

function validateAuthConfig(...requiredKeys: (keyof AuthConfig)[]) {
  requiredKeys.forEach(key => {
    if (!AUTH_CONFIG[key]) {
      throw new ReferenceError(`${key} is not defined`);
    }
  });
}

function handleTokenResponse(resp: TokenResponse): boolean {
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
  return success;
}

export default function useGoogleAuth(): AuthService {
  validateAuthConfig("client_id");

  const [loggedIn, setLoggedIn] = useState<boolean>(() => !!gapi?.client?.getToken()?.access_token);
  const [tokenClient, setTokenClient] = useState<TokenClient>(() => createTokenClient(_.flow(handleTokenResponse, setLoggedIn)));

  const doLogin = useCallback(() => {
    if (!tokenClient) {
      console.warn("Auth client not initialized in doLogin...");
      setTokenClient(createTokenClient(handleTokenResponse));
    }

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
  }, [tokenClient]);

  /**
   *  Sign out the user upon button click.
   */
  const doLogout = useCallback(() => {
    const token = gapi.client.getToken();
    if (token) {
      google.accounts.oauth2.revoke(token.access_token, () => {
        console.log("session token revoked");
      });
      gapi.client.setToken(null);
    }
    setLoggedIn(false);
  }, []);
  
  useEffect(() => {
    console.info("Initializing auth and api clients...");
    loadGoogleApi().then(() => {
      console.info("gapi.client initialized");
    }, (err) => console.error("gapi.client init failed", err));
  }, []);

  return  { loggedIn, doLogin, doLogout };
}