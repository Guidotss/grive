export class CustomError {
  public readonly statusCode: number;
  public readonly message: string;
  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
