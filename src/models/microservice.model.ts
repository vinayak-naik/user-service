import { Schema, Model, model } from "mongoose";
import { singleton } from "tsyringe";
import ModelI from "../interfaces/model.interface";
import MicroserviceSI from "../interfaces/microservice.interface";

@singleton()
export default class MicroserviceModel implements ModelI {
  schema: Schema<any> = new Schema(
    {
      name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      role: {
        type: String,
        default: "microservice",
      },
      active: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );
  model: Model<any, any> = model<MicroserviceSI>("microservices", this.schema);
}
