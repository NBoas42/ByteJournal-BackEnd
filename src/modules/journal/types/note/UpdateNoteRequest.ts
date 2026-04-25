import * as z from 'zod';

export const UpdateNoteRequestSchema = z.object({
    id: z.string().optional(),
    content: z.string(),
    type: z.string(),
});
export type UpdateNoteRequest = z.infer<typeof UpdateNoteRequestSchema>;
