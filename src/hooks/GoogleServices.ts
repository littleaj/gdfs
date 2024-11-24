import { useState } from "react";
import ApiService from "../services/ApiService";
import GoogleApiService from "../services/GoogleApiService";
import RemoteService from "../services/RemoteService";
import GoogleAuthConfig from "../model/GoogleAuthConfig";
import AuthService from "../services/AuthService";
import GoogleAuthService from "../services/GoogleAuthService";

// XXX this could be more generic to better support other implementations
export function useGoogleServices(apiConfig: GoogleAuthConfig) {
  const [api, ] = useState<ApiService>(() => new GoogleApiService(window.gapi, apiConfig.api_key));
  const [auth, ] = useState<AuthService>(() => new GoogleAuthService(window.google.accounts.oauth2, apiConfig));

  return { auth, api } as RemoteService;
}
