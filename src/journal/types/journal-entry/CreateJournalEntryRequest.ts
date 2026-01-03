import * as z from 'zod';
export const CreateJournalEntryRequestSchema = z.object({
    accountId:z.string(),
    journalId:z.string(),
    title:z.string(),
    tags:z.array(z.string()).optional(),
});
export type CreateJournalEntryRequest = z.infer<typeof CreateJournalEntryRequestSchema>;