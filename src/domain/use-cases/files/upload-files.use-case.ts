import { JwtAdapter } from "../../../config/adapters/jwt";
import { UploadFileDto } from "../../dtos";
import { CustomError } from "../../errors";
import { FilesRepository } from "../../repositories";
import { VerifyToken } from "../../types";

interface CustomResponse {
  ok: boolean;
  message: string;
  data: {
    url: string;
    id: string;
  };
}
interface IUploadFilesUseCase {
  execute(uploadFileDto: UploadFileDto, token: string): Promise<CustomResponse>;
}

export class UploadFilesUseCase implements IUploadFilesUseCase {
  private readonly verifyToken: VerifyToken = JwtAdapter.verify;
  constructor(private readonly filesRepository: FilesRepository) {}
  async execute(
    uploadFileDto: UploadFileDto,
    token: string
  ): Promise<CustomResponse> {
    const { userId } = await this.verifyToken<{ userId: string }>(
      token,
      process.env.JWT_SECRET!
    );
    if (!userId) {
      throw new CustomError(400, "Invalid token");
    }
    const result = await this.filesRepository.uploadFile(uploadFileDto, userId);
    return {
      ok: true,
      message: "File uploaded successfully",
      data: {
        url: result.url,
        id: result.id,
      },
    };
    console.log(userId);
  }
}
