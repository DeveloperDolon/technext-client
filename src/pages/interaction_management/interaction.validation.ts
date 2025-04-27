import { z } from 'zod';

export const createInteractionZodSchema = z.object({
    interaction: z.object({
      notes: z.string().optional(),
      projectId: z.string(),
      clientId: z.string(),
      date: z.coerce.date(),
      type: z.enum(['EMAIL', 'CALL', 'MEETING']).default('EMAIL'),
    }),
});

export const updateInteractionZodSchema = z.object({
  body: z.object({
    interaction:
      createInteractionZodSchema.shape.interaction.partial(),
  }),
});

export type CreateInteractionValidationType = z.infer<typeof createInteractionZodSchema>;
export type UpdateInteractionValidationType = z.infer<typeof updateInteractionZodSchema>;