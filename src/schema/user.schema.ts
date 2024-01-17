import { boolean, number, object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    }),
    lastName: string({
      required_error: "Last name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short - should be min 6 chars"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export const getUserByEmailSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});
export const updateUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    }),
    lastName: string({
      required_error: "Last name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short - should be min 6 chars"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    active: boolean({ required_error: "User state is required" }),
    verified: boolean({ required_error: "User verification state is required" }),
    balance: number({ required_error: "Wallet balance is required" }),
  }),
});
