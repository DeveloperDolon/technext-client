import { z } from "zod";

export const signup_validation = z.object({
    password: z.string().min(8, "Password must be 8 character!"),
    user: z.object({
        name: z.string().min(3, "Please input username"),
        email: z.string().email("Please provide a valid email address!"),
        themePref: z.enum(["light", "dark"]).default("light"),
    }),
});

export type SignupValidationType = z.infer<typeof signup_validation>;
