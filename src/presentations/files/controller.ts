import { CustomError, FilesRepository } from "../../domain";
import { Response, Request } from "express";
import { UploadFileDto } from "../../domain/dtos";
import { WinstonAdapter } from "../../config";

export class FilesController {
  private readonly logger = new WinstonAdapter();
  constructor(private readonly filesRepository: FilesRepository) {}

  private handleErorr(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        ok: false,
        message: error.message,
      });
    }

    this.logger.error(error as string);
    return res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
  }

  public uploadFile = async (req: Request, res: Response) => {
    const [errors, uploadFileDto] = UploadFileDto.create(req.file);
    if (errors) return res.status(400).json({ message: errors });
    try {
      const result = await this.filesRepository.uploadFile(uploadFileDto!);
      return res.status(201).json({
        ok: true,
        message: "File uploaded successfully",
        data: {
          url: result.url,
          id: result.id,
        },
      });
    } catch (error) {
      this.handleErorr(error, res);
    }
  };
}
