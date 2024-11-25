export interface GoogleAuthService {
  loggedIn: boolean;
  doLogin: () => void;
  doLogout: () => void;
}

export interface AuthConfig {
  api_key: string;
  client_id: string;
  discovery_doc: string;
  scopes: string;
}