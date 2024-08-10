import { UploadFileDto } from "../../dtos";
import { FileEntity } from "../../entities";
export abstract class FilesDataSource {
  abstract uploadFile(file: UploadFileDto): Promise<FileEntity>;
  abstract getFileUrl(key: string): Promise<string>;
  abstract deleteFile(key: string): Promise<void>;
}
