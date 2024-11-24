
export default interface ApiService {
  // TODO clean up these types with concrete types
  list<FileTreeDTO>(basePath?: string): FileTreeDTO;
  delete<FileDescriptionDTO>(file: FileDescriptionDTO): boolean;
  download<FileDescriptionDTO>(remote: FileDescriptionDTO, local: FileDescriptionDTO): FileDescriptionDTO;
  upload<FileDescriptionDTO>(local: FileDescriptionDTO, remote: FileDescriptionDTO): FileDescriptionDTO;
}