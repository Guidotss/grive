import { Router } from "express";
import { FilesRoutes } from "./files/routes";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/files", FilesRoutes.routes);
    router.use("/auth", AuthRoutes.routes);
    router.use("/health", (_, res) => {
      return res.status(200).json({ ok: true, message: "Server is running" });
    });
    router.use((_, res) => {
      return res.status(404).json({ ok: false, message: "Resource Not Found" });
    });
    return router;
  }
}
