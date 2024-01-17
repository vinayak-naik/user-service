import { autoInjectable } from "tsyringe";
import MicroserviceService from "../services/microservice.service";
import BaseController from "./base.controller";
import sendResponse from "../utils/sendResponse";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import MicroserviceSI from "../interfaces/microservice.interface";

@autoInjectable()
export default class MicroserviceController extends BaseController {
  service: MicroserviceService;
  constructor(service?: MicroserviceService) {
    super(service);
    this.service = service;
  }

  getMicroserviceByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = req.params.name;
      const resource = await this.service.findOne({ name });
      if (!resource) {
        const failedMessage = "No microservice found";
        sendResponse(res, 400, false, null, failedMessage);
        return;
      }
      const successMessage = "success";
      sendResponse(res, 200, true, resource, successMessage);
    } catch (error) {
      next(error);
    }
  };

  createMicroservice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check existing microservice
      const microservice = await this.service.findOne({ name: req.body.name });
      if (microservice) {
        const message = "Microservice already exists";
        sendResponse(res, 403, false, null, message);
        return;
      }

      const resource = await this.service.post(req.body);

      const successMessage = "Microservice created successfully";
      sendResponse(res, 200, true, resource, successMessage);
    } catch (error) {
      next(error);
    }
  };

  updateMicroservice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const match = { _id: id };
      const update = req.body;
      const resource = (await this.service.findOneAndUpdate(match, update)) as MicroserviceSI;
      if (!resource) {
        const message = "Invalid microservice";
        sendResponse(res, 403, false, null, message);
        return;
      }
      const successMessage = "Microservice updated successfully";
      sendResponse(res, 200, true, resource, successMessage);
    } catch (error) {
      next(error);
    }
  };
}
