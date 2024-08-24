import { RedisAdapter, S3Adapter } from "../../../config";
import { filesClient } from "../../../data/mongo";
import { FilesDataSource, FileEntity, CustomError } from "../../../domain";
import { UploadFileDto } from "../../../domain/dtos";

export class FilesDataSourceImpl implements FilesDataSource {
  private readonly filesClient = filesClient;
  private readonly redisAdapter = RedisAdapter;

  constructor(private readonly s3Adapter = new S3Adapter()) {}
  async getFiles(userId: string): Promise<FileEntity[]> {
    const cachedFiles = await this.redisAdapter.get(userId);
    if (cachedFiles) {
      return JSON.parse(cachedFiles).map((file: any) =>
        FileEntity.fromObject(file)
      );
    }
    const files = await this.filesClient.findMany({
      where: {
        userId,
      },
    });
    this.redisAdapter.set(userId, JSON.stringify(files));
    return files.map((file) => FileEntity.fromObject(file));
  }
  async uploadFile(file: UploadFileDto, userId: string): Promise<FileEntity> {
    try {
      const fileData = await this.s3Adapter.uploadFile(file);
      const newFile = await this.filesClient.create({
        data: {
          key: fileData.Key,
          title: file.originalname,
          url: S3Adapter.sharedUrl + `/${fileData.Key}`,
          userId,
        },
      });
      const cachedFiles = await this.redisAdapter.get(userId);
      if (cachedFiles) {
        const files = JSON.parse(cachedFiles);
        files.push(newFile);
        this.redisAdapter.set(userId, JSON.stringify(files));
      }
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
