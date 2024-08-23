import { UploadFileDto } from "../../dtos";
import { FileEntity } from "../../entities";
export abstract class FilesDataSource {
  abstract uploadFile(file: UploadFileDto, userId: string): Promise<FileEntity>;
  abstract getFileUrl(key: string): Promise<string>;
  abstract getFiles(userId: string): Promise<FileEntity[]>;
  abstract deleteFile(key: string): Promise<void>;
}
