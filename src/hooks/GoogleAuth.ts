import { useCallback, useEffect, useState } from "react";

const AuthConfig = {
  api_key: import.meta.env.VITE_API_KEY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  discovery_doc: "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  scopes: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly", // Q is this all I need for scopes?
};

export default function useGoogleAuth(): [boolean, ()=>void, ()=>void] {

  const [tokenClient, /* readonly */] = useState<TokenClient>(() => google.accounts.oauth2.initTokenClient({
    client_id: AuthConfig.client_id,
    scope: AuthConfig.scopes,
    callback: (resp) => {
      if (resp.error !== undefined) {
        const { error, error_description, error_uri } = resp;
        const errorMessage = `${error}: ${error_description} <${error_uri}>`;
        console.error("TC callback error!", errorMessage);
        throw new Error(errorMessage);
      }
    },
    error_callback: (err) => {
      console.error("TC ClientConfigError: auth did not complete", err);
    }
  }));

  const [loggedIn, setLoggedIn] = useState<boolean>(() => !!gapi?.client?.getToken()?.access_token);

  /**
   *  Sign in the user upon button click.
   */
  const doLogin = useCallback(() => {
    if (!tokenClient) {
      console.error("Auth client not initialized!");
      return;
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
    setLoggedIn(!!gapi.client.getToken());
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
    gapi.load("client", () => {
      console.log("Start gapi.client init");
      gapi.client.init({
        apiKey: AuthConfig.api_key,
        discoveryDocs: [(AuthConfig.discovery_doc)],
      }).then(() => {
        console.info("gapi.client initialized");
      }, (err) => console.error("gapi.client init failed", err));
    });
  }, []);

  return [loggedIn, doLogin, doLogout];
}