import { envs } from "../../../config";
import { JwtAdapter } from "../../../config/adapters/jwt";
import { RegisterDto } from "../../dtos";
import { CustomError } from "../../errors";
import { AuthRepository } from "../../repositories";
import { CustomAuthReponse, SignToken } from "../../types";
interface IRegisterUseCase {
  execute(registerDto: RegisterDto): Promise<CustomAuthReponse>;
}

export class RegisterUseCase implements IRegisterUseCase {
  private readonly signToken: SignToken = JwtAdapter.sign;
  constructor(private readonly authRepository: AuthRepository) {}
  async execute(registerDto: RegisterDto): Promise<CustomAuthReponse> {
    const user = await this.authRepository.register(registerDto);
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
        lastName: user.lastName,
        email: user.email,
      },
    };
  }
}
