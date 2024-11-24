export default interface GoogleApiConfig {
  // FIXME inject these at build time
  api_key?: string; // XXX this shouldn't be public; create a CLASP service to serve tokens
  client_id: string; 
}