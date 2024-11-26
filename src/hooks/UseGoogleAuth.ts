import { useEffect, useState } from "react";
import { AuthService } from "../@types/AuthService";
import _ from "lodash";
import { createTokenClient, loadGoogleApis, loginHandler, logoutHandler } from "../model/GoogleAuthService";
import { TokenClient } from "../@types/gis";

export default function useGoogleAuth(): AuthService {
  // we only want this to load once
  const [tokenClient, /* readonly */ ] = useState<TokenClient>(createTokenClient);
  useEffect(() => {
    console.info("Initializing auth and api clients...");
    
    loadGoogleApis().then(() => {
      console.info("gapi.client initialized");
    }, (err) => console.error("gapi.client init failed", err));
  }, []);
  const [loggedIn, setLoggedIn] = useState<boolean>(() => !!gapi?.client?.getToken()?.access_token);

  
  const doLogin = () => {
    _.partial(loginHandler, tokenClient)();
    setLoggedIn(true);
  };

  const doLogout = () => {
    logoutHandler();
    setLoggedIn(false);
  };

  

  return { loggedIn, doLogin, doLogout };
}