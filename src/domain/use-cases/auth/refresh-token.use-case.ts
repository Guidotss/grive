import { envs } from "../../../config";
import { JwtAdapter } from "../../../config/adapters/jwt";
import { CustomError } from "../../errors";
import { AuthRepository } from "../../repositories";
import { CustomAuthReponse, SignToken, VerifyToken } from "../../types";

interface IRegfreshTokenUseCase {
  execute(token: string): Promise<CustomAuthReponse>;
}
export class RefreshTokenUseCase implements IRegfreshTokenUseCase {
  private readonly signToken: SignToken = JwtAdapter.sign;
  private readonly verifyToken: VerifyToken = JwtAdapter.verify;
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: string): Promise<CustomAuthReponse> {
    const payload = await this.verifyToken<{ userId: string }>(
      token,
      envs.JWT_SECRET
    );
    const user = await this.authRepository.getUserById(payload.userId);
    const newToken = await this.signToken(
      { userId: user.id },
      envs.JWT_SECRET,
      "1d"
    );
    if (!newToken) {
      throw new CustomError(500, "Internal server error");
    }
    return {
      ok: true,
      token: newToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
