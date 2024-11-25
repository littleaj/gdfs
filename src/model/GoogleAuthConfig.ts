export default interface GoogleAuthConfig {
  api_key: string; // XXX this shouldn't be public; can a CLASP service to serve tokens?
  client_id: string; 
  discovery_doc: string;
  /**
   * Space separated list of scopes
   */
  scopes: string;
}