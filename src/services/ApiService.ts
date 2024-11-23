
export default interface ApiService {
  // TODO clean up these types with concrete types
  list<FileTreeDTO>(basePath?: string): FileTreeDTO;
  delete<FileDescriptionDTO>(file: FileDescriptionDTO): boolean;
  download<FileDescriptionDTO>(file: FileDescriptionDTO): FileDescriptionDTO;
  upload<FileDescriptionDTO>(file: FileDescriptionDTO, to: FileDescriptionDTO): FileDescriptionDTO;
}