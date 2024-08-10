import { FilesDataSource } from "../../domain";


export class FilesDataSourceImpl implements FilesDataSource {
  uploadFile(file: Express.Multer.File): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getFileUrl(id: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  deleteFile(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
