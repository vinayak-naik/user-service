import { autoInjectable } from "tsyringe";
import UserService from "../services/user.service";
import BaseController from "./base.controller";
import sendResponse from "../utils/sendResponse";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { generateOTP } from "../utils/uniqueNumber";
import UserSI from "../interfaces/user.interface";

@autoInjectable()
export default class UserController extends BaseController {
  service: UserService;
  constructor(service?: UserService) {
    super(service);
    this.service = service;
  }

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resource = await this.service.get({}, { password: 0, verificationCode: 0 });
      const successMessage = "success";
      sendResponse(res, 200, true, resource, successMessage);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const resource = await this.service.findOne({ _id: id }, { password: 0, verificationCode: 0 });
      if (!resource) {
        const failedMessage = "No user found";
        sendResponse(res, 400, false, null, failedMessage);
        return;
      }
      const successMessage = "success";
      sendResponse(res, 200, true, resource, successMessage);
    } catch (error) {
      next(error);
    }
  };
  getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resource = await this.service.findOne({ email: req.body.email }, {});
      if (!resource) {
        const failedMessage = "No user found";
        return sendResponse(res, 204, false, null, failedMessage);
      }
      const successMessage = "success";
      return sendResponse(res, 200, true, resource, successMessage);
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check existing user
      const user = await this.service.findOne({ email: req.body.email });
      if (user) {
        const message = "User already exists";
        sendResponse(res, 403, false, null, message);
        return;
      }

      // Hash OTP
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Add OTP-hash to user ddocument
      req.body.password = hashedPassword;
      const resource = await this.service.post(req.body);

      const successMessage = "User created successfully";
      sendResponse(res, 200, true, resource, successMessage);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const match = { _id: id };
      const update = req.body;
      const resource = (await this.service.findOneAndUpdate(match, update)) as UserSI;
      if (!resource) {
        const message = "Invalid user";
        sendResponse(res, 403, false, null, message);
        return;
      }
      const successMessage = "User updated successfully";
      sendResponse(res, 200, true, resource, successMessage);
    } catch (error) {
      next(error);
    }
  };
}
