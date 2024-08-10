import { LoginDto, RegisterDto } from "../../dtos";
import { UserEntity } from "../../entities";

export abstract class AuthRepository {
  abstract login(loginDto: LoginDto): Promise<UserEntity>;
  abstract getUserById(id: string): Promise<UserEntity>;
  abstract register(registerDto: RegisterDto): Promise<UserEntity>;
}
