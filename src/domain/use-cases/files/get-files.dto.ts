import { JwtAdapter } from "../../../config";
import { CustomError } from "../../errors";
import { FilesRepository } from "../../repositories";
import { VerifyToken } from "../../types";

interface GetFilesDto {
  title: string;
  url: string;
  key: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
interface CustomResponse {
  ok: boolean;
  message: string;
  data: GetFilesDto[];
}

interface IGetFilesUseCase {
  execute(token: string): Promise<CustomResponse>;
}

export class GetFilesUseCase implements IGetFilesUseCase {
  private readonly verifyToken: VerifyToken = JwtAdapter.verify;
  constructor(private readonly filesRepository: FilesRepository) {}

  async execute(token: string): Promise<CustomResponse> {
    const { userId } = await this.verifyToken<{ userId: string }>(
      token,
      process.env.JWT_SECRET!
    );
    if (!token) {
      throw new CustomError(400, "Token is required");
    }
    const files = await this.filesRepository.getFiles(userId);

    return {
      ok: true,
      message: "Files fetched successfully",
      data: files,
    };
  }
}
