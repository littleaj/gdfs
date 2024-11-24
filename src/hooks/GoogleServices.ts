import { useState } from "react";
import ApiService from "../services/ApiService";
import GoogleApiService from "../services/GoogleApiService";
import RemoteService from "../services/RemoteService";
import GoogleAuthConfig from "../model/GoogleAuthConfig";
import { AuthenticationState } from "../services/ServiceUtils";

// XXX this could be more generic to better support other implementations
export function useGoogleServices(apiConfig: GoogleAuthConfig) {
  const authState = new AuthenticationState();
  const [api, ] = useState<ApiService>(() => new GoogleApiService(window.gapi, apiConfig));
  // const [auth, ] = useState<AuthService>(() => new GoogleAuthService(window.google.accounts.oauth2, apiConfig, authState));

  return { auth, api } as RemoteService;
}
