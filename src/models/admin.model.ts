import { Schema, Model, model } from "mongoose";
import { singleton } from "tsyringe";
import AdminSI from "../interfaces/admin.interface";
import ModelI from "../interfaces/model.interface";

@singleton()
export default class AdminModel implements ModelI {
  schema: Schema<any> = new Schema(
    {
      firstName: {
        type: String,
        required: true,
        lowercase: true,
      },
      lastName: {
        type: String,
        required: true,
        lowercase: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      verificationCode: {
        type: String,
        default: null,
      },
      balance: {
        type: Number,
        default: 0,
      },
      role: {
        type: String,
        default: "admin",
      },
    },
    {
      timestamps: true,
    }
  );
  model: Model<any, any> = model<AdminSI>("admins", this.schema);
}
