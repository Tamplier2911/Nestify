import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import * as config from "config";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === "development") {
    // enable cors
    app.enableCors();
  }

  // environment config
  const serverConfig = config.get("server");

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application is listening on port http://localhost:${port}/ ...`);
}
bootstrap();
