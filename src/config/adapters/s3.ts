import AWS from "aws-sdk";
import { envs } from "../envs";
import { UploadFileDto } from "../../domain/dtos";

export class S3Adapter {
  private readonly s3 = new AWS.S3({
    accessKeyId: envs.STORJ_S3_ACCESS_KEY,
    secretAccessKey: envs.STORJ_S3_SECRET_KEY,
    endpoint: envs.STORJ_GATEWAY_ENDPOINT,
    s3ForcePathStyle: true,
  });
  static sharedUrl = envs.STORJ_SHARED_ENDPOINT;

  public async uploadFile(
    file: UploadFileDto
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const params = {
      Bucket: "grive",
      Key: file.originalname,
      Body: file.buffer,
    };
    const resp = await this.s3.upload(params).promise();
    return resp;
  }

  public async deleteFile(key: string): Promise<void> {
    const params = {
      Bucket: "grive",
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
  }
}
