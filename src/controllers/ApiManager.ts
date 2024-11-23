import { OperationResult } from "../model/Operation";

export default interface ApiManager {
  
  // TODO clean up these types with the actual type heirarchies
  list<FileTreeDTO>(basePath?: string): OperationResult<FileTreeDTO>;
  delete<FileDescriptionDTO>(file: FileDescriptionDTO): OperationResult;
  download<FileDescriptionDTO>(file: FileDescriptionDTO): OperationResult<FileDescriptionDTO>;
  upload<FileDescriptionDTO>(file: FileDescriptionDTO, to: FileDescriptionDTO): OperationResult<FileDescriptionDTO>;
}