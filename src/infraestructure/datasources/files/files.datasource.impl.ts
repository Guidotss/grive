import { S3Adapter } from "../../../config";
import { filesClient } from "../../../data/mongo";
import { FilesDataSource, FileEntity, CustomError } from "../../../domain";
import { UploadFileDto } from "../../../domain/dtos";

export class FilesDataSourceImpl implements FilesDataSource {
  private readonly filesClient = filesClient;
  constructor(private readonly s3Adapter = new S3Adapter()) {}
  async uploadFile(file: UploadFileDto): Promise<FileEntity> {
    try {
      const fileData = await this.s3Adapter.uploadFile(file);
      console.log(fileData);
      const newFile = await this.filesClient.create({
        data: {
          key: fileData.Key,
          title: file.originalname,
          url: S3Adapter.sharedUrl + `/${fileData.Key}`,
          userId: file.userId, 
        },
      });
      const fileEntity = FileEntity.fromObject(newFile);
      return fileEntity;
    } catch (error) {
      console.log(error);
      throw new CustomError(500, "Internal Server error");
    }
  }
  getFileUrl(id: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  deleteFile(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
