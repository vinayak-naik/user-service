import app from "./app";
import connectDb from "./utils/database";
import config from "config";
import logger from "./utils/logger";

const PORT = config.get("port");
connectDb().then(() => {
  app.listen(PORT, async () => {
    logger.info(`User service is running on port ${PORT}`);
  });
});
