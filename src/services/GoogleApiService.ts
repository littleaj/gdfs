import ApiService from "./ApiService";

export default class GoogleApiService implements ApiService {
  #client: GAPI;
  constructor(client: GAPI) {
    this.#client = client;
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