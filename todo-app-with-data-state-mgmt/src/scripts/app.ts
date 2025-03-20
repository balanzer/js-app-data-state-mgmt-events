import { Logger } from "./logger/log";
import { AppDataLayer } from "./data/data-layer";
const logger = new Logger("app");

/**
 * Setup mock backend data
 */
logger.info("Hello World App");

//data for debug
const appDataLayer = new AppDataLayer();
appDataLayer.setDataForUI();
