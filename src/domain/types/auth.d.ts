export type CustomAuthReponse = {
  ok: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};
