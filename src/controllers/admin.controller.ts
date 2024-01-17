import { autoInjectable } from "tsyringe";
import AdminService from "../services/admin.service";
import BaseController from "./base.controller";
import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import AdminSI from "../interfaces/admin.interface";

@autoInjectable()
export default class AdminController extends BaseController {
  service: AdminService;
  constructor(service?: AdminService) {
    super(service);
    this.service = service;
  }

  createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check existing admin
      const adminList = await this.service.get();
      if (adminList.length > 0) {
        const message = "Admin already exists";
        sendResponse(res, 403, false, null, message);
        return;
      }

      const resource = await this.service.post(req.body);

      const successMessage = "Admin created successfully";
      sendResponse(res, 200, true, resource, successMessage);
    } catch (error) {
      next(error);
    }
  };

  getAdminByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resource = await this.service.findOne({ email: req.body.email }, {});
      const successMessage = "success";
      sendResponse(res, 200, true, resource, successMessage);
    } catch (error) {
      next(error);
    }
  };

  updateAdminByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const match = { email: req.body.email };
      const update = { verificationCode: req.body.verificationCode };
      const resource = (await this.service.findOneAndUpdate(match, update)) as AdminSI;
      if (!resource) {
        const message = "Invalid user";
        sendResponse(res, 403, false, null, message);
        return;
      }
      const successMessage = "Email updated successfully";
      sendResponse(res, 200, true, resource, successMessage);
    } catch (error) {
      next(error);
    }
  };
}
