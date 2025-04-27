import { z } from "zod";

export const reminderCreateZodSchema = z.object({
  reminder: z.object({
    title: z.string().min(1).max(100),
    notes: z.string().optional(),
    dueDate: z.coerce.date(),
    projectId: z.string(),
    clientId: z.string(),
    isCompleted: z.boolean().default(false),
  }),
});

export const reminderUpdateZodSchema = z.object({
  body: z.object({
    reminder: reminderCreateZodSchema.shape.reminder.partial(),
  }),
});

export type ReminderCreateValidationType = z.infer<
  typeof reminderCreateZodSchema
>;
export type ReminderUpdateValidationType = z.infer<
  typeof reminderUpdateZodSchema
>;
