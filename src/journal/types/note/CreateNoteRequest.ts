import * as z from 'zod';

export const CreateNoteRequestSchema = z.object({
    journalEntryId: z.string(),
    accountId: z.string(),
    content: z.string(),
    type: z.string(),
});
export type CreateNoteRequest = z.infer<typeof CreateNoteRequestSchema>;
