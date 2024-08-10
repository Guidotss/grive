export type TokenData = {
  userId: string;
  iat: number;
  exp: number;
};

export type SignToken = (
  payload: object,
  secret: string,
  expiresIn: string
) => Promise<string | null>;

export type VerifyToken = <T>(token: string, secret: string) => Promise<T>;
