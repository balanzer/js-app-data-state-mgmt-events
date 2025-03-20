import { Logger } from "../logger/log";
import { AppServer } from "../server/server";
declare global {
  var server: AppServer;
}
export class ClickListners {
  logger = new Logger("click-listners");

  constructor() {
    globalThis.server = new AppServer();
    this.setupListners();
  }

  setupListners() {
    this.logger.info("init listners");
  }

  handleClickAllReminders() {
    globalThis.server.getReminders();
  }
}
