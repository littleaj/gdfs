export interface GoogleAuthService {
  loggedIn: boolean;
  doLogin: () => void;
  doLogout: () => void;
}

export interface AuthConfig {
  client_id: string;
  discovery_doc: string;
  scopes: string;
}