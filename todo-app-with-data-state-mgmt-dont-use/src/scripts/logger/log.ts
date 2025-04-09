export class Logger {
  name: string;
  constructor(module) {
    this.name = module;
  }

  log(message, ...args) {
    console.info(`[${this.name}] ${message}`, ...args);
  }

  debug(message, ...args) {
    console.info(`[${this.name}] ${message}`, ...args);
  }

  info(message, ...args) {
    console.info(`[${this.name}] ${message}`, ...args);
  }

  error(message, ...args) {
    console.error(`[${this.name}] ${message}`, ...args);
  }
}
