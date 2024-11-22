import OperationResult from "./OperationResult";

export default interface DriveOperations {
  // TODO clean up these types with the actual type heirarchies
  list<FileTreeDTO>(): OperationResult<FileTreeDTO>;
  delete<FileDescriptionDTO>(file: FileDescriptionDTO): OperationResult;
  download<FileDescriptionDTO>(file: FileDescriptionDTO): OperationResult<FileDescriptionDTO>;
  upload<FileDescriptionDTO>(file: FileDescriptionDTO, to: FileDescriptionDTO): OperationResult<FileDescriptionDTO>;
}