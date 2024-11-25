import "./App.css";
import GoogleAuthConfig from "./model/GoogleAuthConfig";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { useState } from "react";

function App() {
  const apiConfig: GoogleAuthConfig = {
    api_key: import.meta.env.VITE_API_KEY,
    client_id: import.meta.env.VITE_CLIENT_ID,
    discovery_doc: "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    scopes: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly", // Q is this all I need for scopes?
  };

  const CLIENT_ID = apiConfig.client_id;
  const API_KEY = apiConfig.api_key;
  const DISCOVERY_DOC = apiConfig.discovery_doc;
  const SCOPES = apiConfig.scopes;

  let tokenClient: TokenClient;

  function loadGapi() {
    gapi.load("client", initializeGapiClient);
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  function initializeGapiClient() {
    console.log("Start gapi.client init");
    gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    }).then(() => {
      console.info("gapi.client initialized");
    },
      (err) => console.error("gapi.client init failed", err))
      .then(() => gisLoaded())
      .catch((err) => console.error("Error from GIS init: ", err));
  }

  /**
   * Callback after Google Identity Services are loaded.
   */
  function gisLoaded() {
    console.log("initTokenClient");
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (resp) => {
        console.log("TC callback! => ", resp);
        if (resp.error !== undefined) {
          console.error("TC callback error!");
          const { error, error_description, error_uri } = resp;
          throw new Error(`${error}: ${error_description} <${error_uri}>`);
        }
        listFiles();
      },
      error_callback: (err) => {
        console.error("TC ClientConfigError: auth did not complete", err);
      }
    });
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick() {
    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      console.log("auth: consent prompt...");
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      console.log("auth: empty prompt...");
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: "" });
    }
    setLoggedIn(!!gapi.client.getToken());
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token) {
      google.accounts.oauth2.revoke(token.access_token, () => {
        console.log("token revoked");
      });
      gapi.client.setToken(null);
    }
    setLoggedIn(false);
  }

  /**
   * Print metadata for first 10 files.
   */
  function listFiles() {
    console.log("querying for files");
    gapi.client.drive.files.list({
      pageSize: 10,
      fields: "files(id, name)", // Q how does this work?
    }).then((response) => {
      const files = response.result.files;
      if (!files || files.length == 0) {
        console.info("No files found");
        return;
      }
      // Flatten to string to display
      const output = files.reduce(
        (str, file) => `${str}${file.name} (${file.id})\n`,
        "Files:\n");
      console.info(output);
    },
      (err) => {
        console.error("Error listing drive files: ", err);
      });
  }

  window.addEventListener("DOMContentLoaded", () => {
    console.info("START!");
    loadGapi();
  });

  const [loggedIn, setLoggedIn] = useState<boolean>(() => !!gapi?.client?.getToken()?.access_token);

  return (
    <>
      <header>
        <h1>GDFS</h1>
      </header>
      <Card variant="outlined">
        <CardContent>
          <Typography>This is where files go...</Typography>
          
        </CardContent>
        <CardActions>
          <LoginButton onClick={handleAuthClick} disabled={loggedIn} />
          <LogoutButton onClick={handleSignoutClick} disabled={!loggedIn} />
        </CardActions>
      </Card>
    </>
  );
}

export default App;

