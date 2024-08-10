import AWS from "aws-sdk";
import { envs } from "../envs";

export class S3Adapter {
  private readonly s3 = new AWS.S3({
    accessKeyId: envs.STORJ_S3_ACCESS_KEY,
    secretAccessKey: envs.STORJ_S3_SECRET_KEY,
    endpoint: envs.STORJ_GATEWAY_ENDPOINT,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
  });

  public async uploadFile(file: Express.Multer.File): Promise<string> {
    const params = {
      Bucket: "grive",
      Key: file.originalname,
      Body: file.buffer,
    };

    const { Location } = await this.s3.upload(params).promise();
    return Location;
  }

  public async deleteFile(key: string): Promise<void> {
    const params = {
      Bucket: "grive",
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
  }
}
