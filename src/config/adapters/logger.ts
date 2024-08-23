import winston from "winston";
const { combine, timestamp, printf, colorize } = winston.format;

export class WinstonAdapter {
  private static readonly logPrefix = "[GRIVE]";

  private readonly customFormat = printf(({ level, message, timestamp }) => {
    const prefix = `${WinstonAdapter.logPrefix} ${timestamp} [${level}]`;
    return `${colorize().colorize(level, prefix)}: ${message}`;
  });

  private readonly fileFormat = printf(({ level, message, timestamp }) => {
    const prefix = `${WinstonAdapter.logPrefix} ${timestamp} [${level}]`;
    return `${prefix}: ${message}`;
  });

  static get customColors(): Record<string, string> {
    return {
      error: "red",
      warn: "yellow",
      info: "green",
      debug: "blue",
      verbose: "cyan",
      silly: "magenta",
    };
  }

  private readonly logger = winston.createLogger({
    level: "silly",
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      this.customFormat
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: "./src/logs/error.log",
        level: "error",
        format: combine(
          timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          this.fileFormat
        ),
      }),
      new winston.transports.File({
        filename: "./src/logs/combined.log",
        level: "info",
        format: combine(
          timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          this.fileFormat
        ),
      }),
    ],
  });

  constructor() {
    winston.addColors(WinstonAdapter.customColors);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }
}
