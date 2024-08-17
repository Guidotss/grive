export class RegisterDto {
  constructor(
    public email: string,
    public password: string,
    public name: string, 
    public lastName: string
  ) {}

  public static create(data: any): [string?, RegisterDto?] {
    const { email, password, name, lastName } = data;
    if (!email && !password && !name) {
      return ["Email, password and name are required", undefined];
    }
    if (!email) {
      return ["Email is required", undefined];
    }

    if (!password) {
      return ["Password is required", undefined];
    }

    if (!name) {
      return ["Name is required", undefined];
    }

    return [undefined, new RegisterDto(email, password, name, lastName)];
  }
}
