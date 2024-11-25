import { useCallback, useEffect, useState } from "react";

const AuthConfig = {
  api_key: import.meta.env.VITE_API_KEY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  discovery_doc: "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  scopes: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly", // Q is this all I need for scopes?
};


function createTokenClient(onTokenRequest: TokenClientConfig["callback"]): TokenClient {
  console.log("Creating auth client...");
  return google.accounts.oauth2.initTokenClient({
    client_id: AuthConfig.client_id,
    scope: AuthConfig.scopes,
    callback: onTokenRequest,
    error_callback: (err) => {
      console.error("TC ClientConfigError: auth did not complete", err);
    }
  });
}

async function initializeApiClient(): Promise<void> {
  return gapi.client.init({
    apiKey: AuthConfig.api_key,
    discoveryDocs: [AuthConfig.discovery_doc],
  });
}

async function loadGoogleApi(): Promise<void> {
  return new Promise<void>((resolve) => {
    gapi.load("client", () => resolve(initializeApiClient()));
  });
}

interface GoogleAuthService {
  loggedIn: boolean;
  doLogin: () => void;
  doLogout: () => void;
}

export default function useGoogleAuth(): GoogleAuthService {
  function handleTokenRequest(resp: google.accounts.oauth2.TokenResponse): void {
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
    setLoggedIn(success);
  }

  const [loggedIn, setLoggedIn] = useState<boolean>(() => !!gapi?.client?.getToken()?.access_token);
  const [tokenClient, setTokenClient] = useState<TokenClient>(() => createTokenClient(handleTokenRequest));

  const doLogin = useCallback(() => {
    if (!tokenClient) {
      console.warn("Auth client not initialized in doLogin...");
      setTokenClient(createTokenClient(handleTokenRequest));
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