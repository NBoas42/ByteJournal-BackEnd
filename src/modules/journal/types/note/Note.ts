import * as z from 'zod';

export const NoteSchema = z.object({
    id: z.string(),
    journalEntryId: z.string(),
    accountId: z.string(),
    content: z.string(),
    type: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});
export type Note = z.infer<typeof NoteSchema>;
