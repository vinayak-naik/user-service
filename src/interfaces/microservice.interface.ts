import mongoose from "mongoose";

export interface MicroserviceI {
  name: string;
  active: boolean;
  role: string;
}

export default interface MicroserviceSI extends MicroserviceI, mongoose.Document {}
