import { useEffect, useState } from "react";
import { AuthService } from "../@types/AuthService";
import _ from "lodash";
import { createTokenClient, loadGoogleApis, loginHandler, logoutHandler } from "../model/GoogleAuthService";
import { TokenClient } from "../@types/gis";

export default function useGoogleAuth(): AuthService {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => !!gapi?.client?.getToken()?.access_token);

  // using useState so it's only initialized once
  const [tokenClient] = useState<TokenClient>(() => createTokenClient(() => setLoggedIn(true)));
  
  const doLogin = () => {
    _.partial(loginHandler, tokenClient)();
    setLoggedIn(true);
  };

  const doLogout = () => {
    logoutHandler();
    setLoggedIn(false);
  };

  // we only want this to load once
  useEffect(() => {
    console.info("Initializing auth and api clients...");

    loadGoogleApis().then(() => {
      console.info("gapi.client initialized");
    }, (err) => console.error("gapi.client init failed", err));
  }, []);

  return { loggedIn, doLogin, doLogout };
}