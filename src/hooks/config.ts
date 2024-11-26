import { AuthConfig } from "../@types/AuthConfig";

export const AUTH_CONFIG: AuthConfig = {
  client_id: import.meta.env.VITE_CLIENT_ID,
  discovery_doc: "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  scopes: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly", // Q is this all I need for scopes?
};
