import { z } from "zod";

export const CreateStorySchema = z.object({
  title: z.string().min(5, { message: "Title is required" }).max(255),
  description: z.string().min(5),
});
