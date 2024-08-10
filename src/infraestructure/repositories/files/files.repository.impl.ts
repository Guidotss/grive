import { FilesRepository, FilesDataSource, FileEntity, UploadFileDto } from "../../../domain";

export class FilesRepositoryImpl implements FilesRepository {
  constructor(private readonly filesDataSource: FilesDataSource) {}
  uploadFile(file: UploadFileDto): Promise<FileEntity> {
    return this.filesDataSource.uploadFile(file);
  }
  getFileUrl(key: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  deleteFile(key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
