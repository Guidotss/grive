import { Router } from "express";
import { FilesRoutes } from "./files/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/files", FilesRoutes.routes);
    router.use("/health", (_, res) => {
      return res.status(200).json({ ok: true, message: "Server is running" });
    });

    return router;
  }
}
