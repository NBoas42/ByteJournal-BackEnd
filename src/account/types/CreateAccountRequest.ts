import { z } from "zod";

export const CreateAccountRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8), // adjust rules if you want
  picture: z.string().min(1),  // could be z.string().url() if it's always a URL
});

export type CreateAccountRequest = z.infer<typeof CreateAccountRequestSchema>;