import { Router } from "express";
import { MulterAdapter } from "../../config";
import {
  FilesDataSourceImpl,
  FilesRepositoryImpl,
} from "../../infraestructure";
import { FilesController } from "./controller";

export class FilesRoutes {
  static get routes() {
    const router = Router();
    const upload = MulterAdapter.getMulter();
    const filesDataSource = new FilesDataSourceImpl();
    const filesRepository = new FilesRepositoryImpl(filesDataSource);
    const filesController = new FilesController(filesRepository);

    router.post("/upload", upload.single("file"), filesController.uploadFile);

    return router;
  }
}
