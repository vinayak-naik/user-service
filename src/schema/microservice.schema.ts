import { boolean, object, string } from "zod";

export const createMicroserviceSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
  }),
});
export const updateMicroserviceSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    active: boolean(),
  }),
});
