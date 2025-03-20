import { Logger } from "../logger/log";
import { createServer } from "miragejs";

export class AppServer {
  logger = new Logger("app-server");

  constructor() {
    this.logger.info("init server");
    this.setupRoutes();
  }

  setupRoutes() {
    this.logger.info("init routes");
    createServer({
      routes() {
        this.get("/api/reminders", () => ({
          reminders: [
            { id: 1, text: "Walk the dog" },
            { id: 2, text: "Take out the trash" },
            { id: 3, text: "Work out" },
          ],
        }));
      },
    });
  }

  getReminders = () => {
    const apiUrl = "/api/reminders";
    this.fetchData(apiUrl)
      .then((data) => {
        this.logger.debug("Data fetched successfully:", data.reminders);
      })
      .catch((error) => {
        this.logger.debug("Failed to fetch data:", error);
      });
  };

  fetchData(url, options = {}) {
    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error("Fetch error:", error);
        throw error;
      });
  }
}
