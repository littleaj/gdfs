import GoogleApiConfig from "./GoogleApiConfig";

export default abstract class GoogleApiManager {
  protected config: GoogleApiConfig;
  constructor(config: GoogleApiConfig) {
    this.config = config;
  }
}