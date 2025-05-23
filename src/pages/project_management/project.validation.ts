import { z } from "zod";

export const projectCreateZodSchema = z.object({
  project: z.object({
    title: z.string().min(1).max(100),
    budget: z.union([z.string().min(1), z.number().min(1)]),
    clientId: z.string().uuid(),
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
