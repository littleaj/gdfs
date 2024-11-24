import ApiService from "./ApiService";
import AuthService from "./AuthService";

export default class GoogleApiService implements ApiService, AuthService {
  #gapi: GAPI;
  constructor(gapi: GAPI, apiKey: string) {
    console.log("Initializing GoogleApiService...");
    this.#gapi = gapi;
  }

  login(): void {
    this.#gapi
  }

  logout(): void {
    // TODO
    throw new Error("Not implemented");
  }

  list<FileTreeDTO>(basePath?: string): FileTreeDTO {
    throw new Error("Method not implemented.");
  }
  delete<FileDescriptionDTO>(file: FileDescriptionDTO): boolean {
    throw new Error("Method not implemented.");
  }
  download<FileDescriptionDTO>(file: FileDescriptionDTO): FileDescriptionDTO {
    throw new Error("Method not implemented.");
  }
  upload<FileDescriptionDTO>(file: FileDescriptionDTO, to: FileDescriptionDTO): FileDescriptionDTO {
    throw new Error("Method not implemented.");
  }
}