import { z } from "zod";

export const projectCreateZodSchema = z.object({
  project: z.object({
    title: z.string().min(1).max(100),
    budget: z.number().min(0),
    clientId: z.string(),
    deadline: z.coerce.date(),
    status: z
      .enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
      .default("PENDING"),
  }),
});

export const projectUpdateZodSchema = z.object({
  body: z.object({
    reminder: projectCreateZodSchema.shape.project.partial(),
  }),
});

export type ProjectCreateValidationType = z.infer<
  typeof projectCreateZodSchema
>;

export type ProjectUpdateValidationType = z.infer<
  typeof projectUpdateZodSchema
>;
