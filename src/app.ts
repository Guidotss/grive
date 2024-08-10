import { Server, AppRoutes } from "./presentations";
import { envs } from "./config";

(async () => {
  await main();
})();

async function main() {
  const server = new Server({
    port: envs.PORT,
    router: AppRoutes.routes,
  });
  server.start();
}
