import { envs } from "../../../config";
import { JwtAdapter } from "../../../config/adapters/jwt";
import { LoginDto } from "../../dtos";
import { CustomError } from "../../errors";
import { AuthRepository } from "../../repositories";
import { CustomAuthReponse, SignToken } from "../../types";

interface ILoginUseCase {
  execute(loginDto: LoginDto): Promise<CustomAuthReponse>;
}

export class LoginUseCase implements ILoginUseCase {
  private readonly signToken: SignToken = JwtAdapter.sign;
  constructor(private readonly authRepository: AuthRepository) { }
  async execute(loginDto: LoginDto): Promise<CustomAuthReponse> {
    const user = await this.authRepository.login(loginDto);
    const token = await this.signToken(
      { userId: user.id },
      envs.JWT_SECRET,
      "1d"
    );
    if (!token) {
      throw new CustomError(500, "Internal server error");
    }
    return {
      ok: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
