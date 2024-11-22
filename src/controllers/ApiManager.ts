import DriveOperations from "../model/DriveOperations";
import GoogleApiManager from "../model/GoogleApiManager";
import OperationResult from "../model/OperationResult";

export default class ApiManager extends GoogleApiManager implements DriveOperations {
  list<FileTreeDTO>(): OperationResult<FileTreeDTO> {
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