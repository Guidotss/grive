import { Router } from "express";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infraestructure";
import { AuthController } from "./controller";

export class AuthRoutes {
  public static get routes(): Router {
    const router = Router();
    const authDatasource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(authDatasource);
    const authController = new AuthController(authRepository);

    router.post("/register", authController.register);
    router.post("/login", authController.login);
    router.get("/refresh-token", authController.refreshToken);

    return router;
  }
}
