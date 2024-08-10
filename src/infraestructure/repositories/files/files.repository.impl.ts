import { FilesRepository, FilesDataSource, FileEntity } from "../../../domain";

export class FilesRepositoryImpl implements FilesRepository {
  constructor(private readonly filesDataSource: FilesDataSource) {}
  uploadFile(file: Express.Multer.File): Promise<FileEntity> {
    return this.filesDataSource.uploadFile(file);
  }
  getFileUrl(key: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  deleteFile(key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
