import { OperationResult } from "../model/Operation";
import ApiManager from "./ApiManager";

export default class GoogleApiManager implements ApiManager {
  #client: GAPI;
  constructor(client: GAPI) {
    this.#client = client;
  }
  list<FileTreeDTO>(basePath?: string): OperationResult<FileTreeDTO> {
    throw new Error("Method not implemented.");
  }
  delete<FileDescriptionDTO>(file: FileDescriptionDTO): OperationResult {
    throw new Error("Method not implemented.");
  }
  download<FileDescriptionDTO>(file: FileDescriptionDTO): OperationResult<FileDescriptionDTO> {
    throw new Error("Method not implemented.");
  }
  upload<FileDescriptionDTO>(file: FileDescriptionDTO, to: FileDescriptionDTO): OperationResult<FileDescriptionDTO> {
    throw new Error("Method not implemented.");
  }
 

}