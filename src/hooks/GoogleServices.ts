import { useState, useEffect } from "react";
import ApiService, { NULL_API_SERVICE } from "../services/ApiService";
import GoogleApiService from "../services/GoogleApiService";
import GoogleAuthService from "../services/GoogleAuthService";
import { PlainFunction } from "../model/UtilityTypes";
import AuthService, { NULL_AUTH_SERVICE } from "../services/AuthService";
import RemoteService from "../services/RemoteService";
import GoogleAuthConfig from "../model/GoogleAuthConfig";

// XXX this could be more generic to better support other implementations
export function useGoogleServices(apiConfig: GoogleAuthConfig) {
  const [auth, setAuth] = useState<AuthService>(NULL_AUTH_SERVICE);
  const [api, setApi] = useState<ApiService>(NULL_API_SERVICE);

  type EventInfo = { target: string; verb: string; };
  const createFailureHandler = ({ target, verb }: EventInfo, reject: (reason?: any) => void) => (e: ErrorEvent) => {
    console.error(`${target} failed to ${verb}: `, e.message);
    console.error(e.error);
    reject(new Error(e.message));
  };

  const createSuccessHandler = ({ target, verb }: EventInfo, resolve: PlainFunction<[GIS], void>) => () => {
    const auth = window.google.accounts.oauth2;
    console.info(`${verb} ${target} successful: `, !!auth);
    resolve(auth);
  };

  useEffect(() => {
    const gsiScript = document.getElementById("script-gsi") as HTMLScriptElement;

    const loadGsi = async () => {
      const loader = new Promise<GIS>((resolve, reject) => {
        const opInfo = {
          target: "GIS",
          verb: "load",
        };
        gsiScript.addEventListener("error", createFailureHandler(opInfo, reject));
        gsiScript.addEventListener("load", createSuccessHandler(opInfo, resolve));
      });
      const auth = await loader;
      setAuth(new GoogleAuthService(auth, apiConfig));
    };
    loadGsi();

    return () => {
      auth?.logout();
    };
  }, []);

  useEffect(() => {
    const gapiScript = document.getElementById("script-gapi") as HTMLScriptElement;
    const loadGapi = async () => {
      const loader = new Promise<GAPI>((resolve, reject) => {
        const opInfo = {
          target: "GAPI",
          verb: "load",
        };
        gapiScript.addEventListener("error", createFailureHandler(opInfo, reject));
        gapiScript.addEventListener("error", (e) => { // TODO make createFailureHandler more generic or another approach
          console.error("GAPI could not load: ", e.message);
          console.error(e.error);
          reject(new Error(e.message));
        });
        gapiScript.addEventListener("load", () => { // TODO make createSuccessHandler more generic or another approach
          const api = window.gapi;
          console.info("Loaded GAPI: ", !!api);
          resolve(api);
        });

      });
      const api = await loader;
      setApi(new GoogleApiService(api));
    };
    loadGapi();
  }, []);

  return { auth, api } as RemoteService;
}
