import { FilesRepository, FilesDataSource, FileEntity, UploadFileDto } from "../../../domain";

export class FilesRepositoryImpl implements FilesRepository {
  constructor(private readonly filesDataSource: FilesDataSource) {}
  getFiles(userId: string): Promise<FileEntity[]> {
    return this.filesDataSource.getFiles(userId);
  }
  uploadFile(file: UploadFileDto, userId: string): Promise<FileEntity> {
    return this.filesDataSource.uploadFile(file, userId);
  }
  getFileUrl(key: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  deleteFile(key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
