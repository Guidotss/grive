export type CustomAuthReponse = {
  ok: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    lastName: string; 
    email: string;
  };
};
