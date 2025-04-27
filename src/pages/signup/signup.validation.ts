import { z } from "zod";

export const signup_validation = z.object({
  name: z.string().min(3, "Please input username"),
  email: z.string().email("Please provide a valid email address!"),
  password: z.string().min(8, "Password must be 8 character!"),
});

export type SignupValidationType = z.infer<typeof signup_validation>;
