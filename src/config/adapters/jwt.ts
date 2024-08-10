import jwt from "jsonwebtoken";
import { CustomError } from "../../domain";
export class JwtAdapter {
  static async sign(
    payload: object,
    secret: string,
    expiresIn = "2h"
  ): Promise<string | null> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, { expiresIn: expiresIn }, (err, token) => {
        if (err) reject(err);
        resolve(token!);
      });
    });
  }

  static async verify<T>(token: string, secret: string): Promise<T> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) throw new CustomError (401, "Invalid token");
        resolve(decoded as T);
      });
    });
  }
}
