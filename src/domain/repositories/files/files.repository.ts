import { UploadFileDto } from "../../dtos";
import { FileEntity } from "../../entities";

export abstract class FilesRepository {
  abstract uploadFile(file: UploadFileDto, userId: string): Promise<FileEntity>;
  abstract getFileUrl(key: string): Promise<string>;
  abstract deleteFile(key: string): Promise<void>;
}
