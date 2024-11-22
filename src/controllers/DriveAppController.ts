import DriveOperations from "../model/DriveOperations";
import OperationResult from "../model/OperationResult";
import ApiManager from "./ApiManager";
import UIController from "./UIController";

export default class DriveAppController implements DriveOperations {
  private readonly ui: UIController;
  private readonly api: ApiManager;
  private constructor(ui: UIController, api: ApiManager) { // FIXME use interfaces here
    this.ui = ui;
    this.api = api;
  }

  list<FileTreeDTO>(): OperationResult<FileTreeDTO> {
    // IMPLEMENT
    throw new Error("Method not implemented.");
  }
  delete<FileDescriptionDTO>(file: FileDescriptionDTO): OperationResult {
    // IMPLEMENT
    throw new Error("Method not implemented.");
  }
  download<FileDescriptionDTO>(file: FileDescriptionDTO): OperationResult<FileDescriptionDTO> {
    // IMPLEMENT
    throw new Error("Method not implemented.");
  }
  upload<FileDescriptionDTO>(file: FileDescriptionDTO, to: FileDescriptionDTO): OperationResult<FileDescriptionDTO> {
    // IMPLEMENT
    throw new Error("Method not implemented.");
  }
  
}