import { injectable } from "tsyringe";
import MicroserviceSI from "../interfaces/microservice.interface";
import MicroserviceModel from "../models/microservice.model";
import BaseService from "./base.service";
import { signJwt } from "../utils/jwt";
import config from "config";

@injectable()
export default class MicroserviceService extends BaseService<MicroserviceSI> {
  constructor(modelI?: MicroserviceModel) {
    super(modelI);
  }
  signAccessToken = async (microservice: MicroserviceSI) => {
    // const payload = omit(microservice.toJSON(), ["password"]);

    const accessTokenPayload = {
      name: microservice.name,
      role: microservice.role,
    };

    const accessToken = signJwt(accessTokenPayload, "accessTokenPrivateKey", {
      expiresIn: config.get("accessTokenExpiration"),
    });

    return accessToken;
  };
  signRefreshToken = async (microservice: MicroserviceSI) => {
    const refreshTokenPayload = {
      microserviceId: microservice._id,
    };
    const refreshToken = signJwt(refreshTokenPayload, "refreshTokenPrivateKey", {
      expiresIn: config.get("refreshTokenExpiration"),
    });
    return refreshToken;
  };
}
