export abstract class FilesDataSource {
  abstract uploadFile(file: Express.Multer.File): Promise<string>;
  abstract getFileUrl(key: string): Promise<string>;
  abstract deleteFile(key: string): Promise<void>;
}
