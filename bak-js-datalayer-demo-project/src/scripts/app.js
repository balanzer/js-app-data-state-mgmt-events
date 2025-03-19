import { getNotes, makeServer } from "./server/server";
import { Logger } from "./logger/log";

const logger = new Logger("app");

/**
 * Setup mock backend data
 */
logger.info("environment : ", process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

getNotes();
