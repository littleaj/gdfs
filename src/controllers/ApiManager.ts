import DriveOperations from "../model/DriveOperations";
import { OperationResult } from "../model/OperationUtils";

export default class ApiManager implements DriveOperations {

  // TODO verify how paths are constructed in Google Drive API
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