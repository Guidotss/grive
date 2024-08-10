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

  public async uploadFile(
    file: UploadFileDto
  ): Promise<{ location: string; key: string }> {
    const params = {
      Bucket: "grive",
      Key: file.originalname,
      Body: file.buffer,
    };

    const { Location } = await this.s3.upload(params).promise();

    return {
      location: Location,
      key: file.originalname,
    };
  }

  public async deleteFile(key: string): Promise<void> {
    const params = {
      Bucket: "grive",
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
  }
}
