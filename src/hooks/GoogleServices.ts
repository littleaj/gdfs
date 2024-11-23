import { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import GoogleApiService from "../services/GoogleApiService";
import GoogleAuthService from "../services/GoogleAuthService";
import { PlainFunction } from "../model/UtilityTypes";
import { AuthService } from "../services/AuthService";

export function useGoogleServices() {
  const [gauth, setGauth] = useState<AuthService>();
  const [gapi, setGapi] = useState<ApiService>();

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
      setGauth(new GoogleAuthService(auth));
    };
    loadGsi();

    return () => {
      gauth?.logout();
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
        gapiScript.addEventListener("error", (e) => {
          console.error("GAPI could not load: ", e.message);
          console.error(e.error);
          reject(new Error(e.message));
        });
        gapiScript.addEventListener("load", () => {
          const api = window.gapi;
          console.info("Loaded GAPI: ", !!api);
          resolve(api);
        });

      });
      const api = await loader;
      setGapi(new GoogleApiService(api));
    };
    loadGapi();
  }, []);

  return {
    gauth,
    gapi
  };
}