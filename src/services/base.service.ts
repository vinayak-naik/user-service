import * as mongoose from "mongoose";
import ModelI from "../interfaces/model.interface";

export default class BaseService<T> {
  model: mongoose.Model<any, any>;
  constructor(modelI?: ModelI) {
    this.model = modelI.model;
  }

  post = async (data: T): Promise<T> => {
    const resource = await this.model.create(data);
    return resource;
  };

  get = async (filters = {}, options = {}): Promise<T[]> => {
    const resource = (await this.model.find(filters, options)) as T[];
    return resource;
  };

  getById = async (id: string): Promise<T> => {
    const resource = (await this.model.findOne({
      _id: new mongoose.Types.ObjectId(id),
    })) as T;
    return resource;
  };

  findOne = async (match: Object, options = {}): Promise<T> => {
    const resource = await this.model.findOne(match, options);
    return resource;
  };

  findOneAndUpdate = async (match: Object, update: Object): Promise<T> => {
    const resource = await this.model.findOneAndUpdate(match, update, { returnDocument: "after" });
    return resource;
  };

  delete = async (id: string): Promise<T> => {
    return this.model.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
  };
}
