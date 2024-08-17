export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
    public created_at: Date,
    public updated_at: Date
  ) {}

  public static fromObject(obj: { [key: string]: any }): UserEntity {
    const { id, name, lastName, email, password, created_at, updated_at } = obj;
    return new UserEntity(
      id,
      name,
      lastName,
      email,
      password,
      created_at,
      updated_at
    );
  }
}
