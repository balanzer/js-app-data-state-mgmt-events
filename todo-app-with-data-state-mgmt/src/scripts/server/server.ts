import { Logger } from "../logger/log";

export class AppServer {
  logger = new Logger("app-server");

  constructor() {
    this.logger.info("init server");
  }

  createServer() {}
}
