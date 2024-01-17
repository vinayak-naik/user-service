import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const connectDb = async () => {
  try {
    const mongoUri: string = config.get("mongoUri");

    await mongoose.connect(mongoUri);
    logger.info(`MongoDB connected to ${mongoUri}`);
  } catch (error) {
    logger.info("Could not connect to mongoDB");
    process.exit(1);
  }
};
export default connectDb;
