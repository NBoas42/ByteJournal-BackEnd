import { z } from "zod";

export const UpdateAccountRequestSchema = z
  .object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    picture: z.string().min(1).optional(), // or .url().optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type UpdateAccountRequest = z.infer<typeof UpdateAccountRequestSchema>;
