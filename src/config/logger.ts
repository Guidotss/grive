import winston from "winston";

export class WinstonAdapter {
  private readonly logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.printf(
        ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
      )
    ),
    defaultMeta: { service: "GRIVE" },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: "./src/logs/error.log",
        level: "error",
      }),
      new winston.transports.File({
        filename: "./src/logs/combined.log",
        format: winston.format.json(),
      }),
    ],
  });

  public info(message: string): void {
    this.logger.info(`${new Date().toISOString()} ${message}`);
  }

  public error(message: string): void {
    this.logger.error(`${new Date().toISOString()} ${message}`);
  }
}
