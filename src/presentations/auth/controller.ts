import { Response, Request } from "express";
import {
  AuthRepository,
  CustomError,
  LoginDto,
  RegisterDto,
} from "../../domain";
import { WinstonAdapter } from "../../config";
import { LoginUseCase, RegisterUseCase } from "../../domain/use-cases";
import { RefreshTokenUseCase } from "../../domain/use-cases/auth/refresh-token.use-case";

export class AuthController {
  private readonly logger = new WinstonAdapter();
  constructor(private readonly authRepository: AuthRepository) {}
  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        ok: false,
        message: error.message,
      });
    }
    this.logger.error((error as Error).message);
    return res.status(500).send("Internal server error");
  }

  public register = (req: Request, res: Response) => {
    const [errors, registerDto] = RegisterDto.create(req.body);
    if (errors) {
      return res.status(400).send(errors);
    }
    new RegisterUseCase(this.authRepository)
      .execute(registerDto!)
      .then((response) => res.status(201).send(response))
      .catch((error) => this.handleError(error, res));
  };

  public login = (req: Request, res: Response) => {
    const [errors, loginDto] = LoginDto.create(req.body);
    if (errors) {
      return res.status(400).send(errors);
    }
    new LoginUseCase(this.authRepository)
      .execute(loginDto!)
      .then((response) => res.status(200).send(response))
      .catch((error) => this.handleError(error, res));
  };

  public refreshToken = (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        ok: false,
        message: "Token is required",
      });
    }
    new RefreshTokenUseCase(this.authRepository)
      .execute(token)
      .then((response) => res.status(200).send(response))
      .catch((error) => this.handleError(error, res));
  };
}
