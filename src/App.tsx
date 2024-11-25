import "./App.css";
import GoogleAuthConfig from "./model/GoogleAuthConfig";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { Button, Card, CardContent, Typography } from "@mui/material";

function App() {
  const apiConfig: GoogleAuthConfig = {
    api_key: import.meta.env.VITE_API_KEY,
    client_id: import.meta.env.VITE_CLIENT_ID,
    discovery_doc: "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    scopes: "https://www.googleapis.com/auth/drive.file", // Q is this all I need for scopes?
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
    gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    }).then(() => {
      console.info("API client initialized");
    }, 
    (err) => { console.error("API client init failed", err) })
    .then(() => gisLoaded())
    .catch((err) => console.error("Error from GIS init: ", err));
  }

  /**
   * Callback after Google Identity Services are loaded.
   */
  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (resp) => {
        if (resp.error !== undefined) {
          throw (resp);
        }
        listFiles();
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
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token, () => {
        console.log("token revoked");
      });
      gapi.client.setToken({} as TokenObject);
    }
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
        console.warn("No files found");
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


  return (
    <>
      <header>
        <h1>GDFS</h1>
      </header>
      <Card variant="outlined">
        <CardContent>
          <Typography>Push the button...</Typography>
          <Button onClick={handleAuthClick}>PUSH</Button>
        </CardContent>
      </Card>
      <div className="card">
        <LoginButton />
        <LogoutButton />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

