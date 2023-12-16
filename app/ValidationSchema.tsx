import { z } from "zod";

export const CreateStorySchema = z.object({
  title: z.string().min(5, { message: "Title is required" }).max(255),
  description: z.string().min(5),
});

export const pathStorySchema = z.object({
  title: z.string().min(3, "Title is required.").optional(),
  description: z
    .string()
    .min(3, "Description is required.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUser is required.")
    .max(255)
    .optional()
    .nullable(),
});
