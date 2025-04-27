import { z } from "zod";

export const login_validation = z.object({
  email: z.string().email("Please provide a valid email address!"),
  password: z.string().min(8, "Password must be 8 character!"),
});

export type LoginValidationType = z.infer<typeof login_validation>;
