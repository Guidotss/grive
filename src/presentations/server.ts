import express, { Router } from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { WinstonAdapter } from "../config"

interface ServerOptions {
  port: number;
  router: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly router: Router;
  private readonly logger = new WinstonAdapter()

  constructor({ port, router }: ServerOptions) {
    this.port = port;
    this.router = router;
  }

  public async start(): Promise<void> {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use((_, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
    this.app.use((req, res, next) => {
      console.log(`Request made to ${req.url}`);
      next();
    });
    this.app.use(compression());
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
      })
    );
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
          "Origin",
          "X-Requested-With",
          "Content-Type",
          "Accept",
        ],
      })
    );

    this.app.use(this.router);
    this.app.listen(this.port, () => {
      this.logger.info(`Server is running on port ${this.port}`);
    });
  }
}
