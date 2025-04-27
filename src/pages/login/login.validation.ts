import { z } from "zod";

export const login_validation = z.object({
  email: z.string().email("Please provide a valid email address!"),
  password: z.string().min(8, "Please input a valid password!"),
});

export type LoginValidationType = z.infer<typeof login_validation>;
