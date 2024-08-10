import {
  AuthDataSource,
  AuthRepository,
  LoginDto,
  RegisterDto,
  UserEntity,
} from "../../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDataSource) {}

  async getUserById(id: string): Promise<UserEntity> {
    return this.authDatasource.getUserById(id);
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    return this.authDatasource.login(loginDto);
  }

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    return this.authDatasource.register(registerDto);
  }
}
