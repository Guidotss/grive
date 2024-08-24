import { FileType } from "@prisma/client";
import { RedisAdapter, S3Adapter, WinstonAdapter } from "../../../config";
import { filesClient, filetypeClient } from "../../../data/mongo";
import { FilesDataSource, FileEntity, CustomError } from "../../../domain";
import { UploadFileDto } from "../../../domain/dtos";

export class FilesDataSourceImpl implements FilesDataSource {
  private readonly logger = new WinstonAdapter();
  private readonly filesClient = filesClient;
  private readonly filetypeClient = filetypeClient;
  private readonly redisAdapter = RedisAdapter;
  private readonly s3Adapter = new S3Adapter();

  constructor() {}

  private async getFileTypeByCategory(
    category: string
  ): Promise<FileType | null> {
    try {
      return await this.filetypeClient.findFirst({
        where: { category },
      });
    } catch (error) {
      this.logger.error(
        `Error fetching file type for category ${category}: ${error}`
      );
      throw new CustomError(500, `Error retrieving file type for category: ${category}`);
    }
  }

  private async cacheFiles(userId: string, files: any[]): Promise<void> {
    try {
      await this.redisAdapter.set(userId, JSON.stringify(files));
    } catch (error) {
      this.logger.error(`Error caching files for user ${userId}: ${error}`);
    }
  }

  async getFiles(userId: string): Promise<FileEntity[]> {
    const cachedFiles = await this.redisAdapter.get(userId);
    if (cachedFiles) {
      return JSON.parse(cachedFiles).map((file: any) =>
        FileEntity.fromObject(file)
      );
    }

    const files = await this.filesClient.findMany({
      where: { userId },
    });

    await this.cacheFiles(userId, files);

    return files.map((file) => FileEntity.fromObject(file));
  }

  async uploadFile(file: UploadFileDto, userId: string): Promise<FileEntity> {
    const fileData = await this.s3Adapter.uploadFile(file);
    const filetype = await this.getFileTypeByCategory(file.category);

    if (!filetype) {
      throw new CustomError(
        400,
        `invalid file category for file ${file.originalname}`
      );
    }

    const newFile = await this.filesClient.create({
      data: {
        key: fileData.Key,
        title: file.originalname,
        url: `${S3Adapter.sharedUrl}/${fileData.Key}`,
        userId,
        fileTypeId: filetype.id,
      },
    });

    const cachedFiles = await this.redisAdapter.get(userId);
    if (cachedFiles) {
      const files = JSON.parse(cachedFiles);
      files.push(newFile);
      await this.cacheFiles(userId, files);
    }

    return FileEntity.fromObject(newFile);
  }

  async getFileUrl(id: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async deleteFile(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
