import { object, string, TypeOf } from "zod";

export const createAdminSchema = object({
  body: object({
    firstName: string({ required_error: "First Name is Required" }).min(1),
    lastName: string({ required_error: "Last Name is Required" }).min(1),
    email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
  }),
});

export const updateAdminEmailSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
    verificationCode: string({ required_error: "verificationCode is required" }),
  }),
});
export const getAdminByEmailSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
  }),
});

export type CreateAdminInput = TypeOf<typeof createAdminSchema>["body"];
export type UpdateAdminEmailInput = TypeOf<typeof updateAdminEmailSchema>["body"];
export type GetAdminByEmailInput = TypeOf<typeof getAdminByEmailSchema>["body"];
