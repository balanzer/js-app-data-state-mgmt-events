import { Logger } from "../logger/log";

export class AppDataLayer {
  logger = new Logger("dl");
  digitalData = [];
  constructor() {
    this.logger.info("init dl");
    this.digitalData = (window as any).digitalData || [];
  }

  getData() {
    // Pageview event
    this.digitalData.push({
      event: "page",
      page_type: "home_page",
    });

    // Purchase event
    this.digitalData.push({
      event: "purchase",
      transaction_id: "123456",
      product_id: "ATLCP",
      product_name: "Atlanta Ravinia CP",
    });
    return this.digitalData;
  }

  setDataForUI() {
    const data = this.getData();

    var jsonPrint = JSON.stringify(data, undefined, 4);
    this.logger.info("set data : ", jsonPrint);
    (document.getElementById("data-state-text") as any).value = jsonPrint;
  }
}
