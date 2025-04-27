import { z } from "zod";

export const createClientZodSchema = z.object({
  client: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().optional(),
    company: z.string().optional(),
    notes: z.string().optional(),
    themePref: z.enum(["light", "dark"]).default("light"),
  }),
});

export const updateClientZodSchema = z.object({
  body: z.object({
    client: createClientZodSchema.shape.client.partial(),
  }),
});

export type CreateClientValidationType = z.infer<typeof createClientZodSchema>;
export type UpdateClientValidationType = z.infer<typeof updateClientZodSchema>;
