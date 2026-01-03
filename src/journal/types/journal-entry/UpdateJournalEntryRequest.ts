import * as z from 'zod';
export const UpdateJournalEntryRequestSchema = z.object({
    title:z.string().optional(),
    tags:z.array(z.string()).optional(),
});
export type UpdateJournalEntryRequest = z.infer<typeof UpdateJournalEntryRequestSchema>;