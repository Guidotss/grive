import { Response, Request } from "express";
import {
  CustomError,
  FilesRepository,
  GetFilesUseCase,
  UploadFileDto,
  UploadFilesUseCase,
} from "../../domain";
import { WinstonAdapter } from "../../config";

export class FilesController {
  private readonly logger = new WinstonAdapter();
  constructor(private readonly filesRepository: FilesRepository) {}

  private handleErorr(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      this.logger.error(error.message);
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

  public uploadFile = (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        ok: false,
        message: "Token is required",
      });
    }
    const [errors, uploadFileDto] = UploadFileDto.create({ ...req.file });
    if (errors) return res.status(400).json({ message: errors });
    try {
      new UploadFilesUseCase(this.filesRepository!)
        .execute(uploadFileDto!, token)
        .then((response) => res.status(201).send(response))
        .catch((error) => this.handleErorr(error, res));
    } catch (error) {
      this.handleErorr(error, res);
    }
  };

  public getFiles = (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        ok: false,
        message: "Token is required",
      });
    }
    new GetFilesUseCase(this.filesRepository!)
      .execute(token)
      .then((response) => res.status(200).send(response))
      .catch((error) => this.handleErorr(error, res));
  };
}
