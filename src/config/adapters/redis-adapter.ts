import Redis from "ioredis";
import { envs } from "../envs";

export class RedisAdapter {
  private static client = new Redis({
    host: envs.REDIS_HOST,
    port: envs.REDIS_PORT,
  });

  public static async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  public static async set(key: string, value: string): Promise<void> {
    this.client.set(key, value);
  }

  public static async del(key: string): Promise<void> {
    this.client.del(key);
  }
}
