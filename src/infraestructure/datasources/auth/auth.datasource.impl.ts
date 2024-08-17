import { BcryptAdapter } from "../../../config/adapters/bcrypt";
import { usersClient } from "../../../data/mongo";
import {
  AuthDataSource,
  CustomError,
  LoginDto,
  RegisterDto,
  UserEntity,
} from "../../../domain";

export class AuthDataSourceImpl implements AuthDataSource {
  private readonly userClient = usersClient;
  private readonly bcryptAdapter = BcryptAdapter;

  private async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userClient.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new CustomError(404, "User not found");
    }
    return UserEntity.fromObject(user);
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userClient.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new CustomError(404, "User not found");
    }
    return UserEntity.fromObject(user);
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const { email, password } = loginDto;
    const user = await this.getUserByEmail(email);
    console.log("user", user);
    if (!this.bcryptAdapter.compare(password, user.password)) {
      throw new CustomError(401, "Invalid credentials");
    }
    return user;
  }
  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const { email } = registerDto;
    const user = await this.userClient.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      throw new CustomError(409, "User already exists");
    }
    const hashedPassword = await this.bcryptAdapter.hash(registerDto.password);
    const newUser = await this.userClient.create({
      data: {
        name: registerDto.name,
        lastName: registerDto.lastName,
        email: registerDto.email,
        password: hashedPassword,
      },
    });
    return UserEntity.fromObject(newUser);
  }
}
