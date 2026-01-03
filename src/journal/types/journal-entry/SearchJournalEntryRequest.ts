
import * as z from 'zod';
export const SearchJournalEntryRequestSchema = z.object({
    accountId: z.string().optional(),
    journalId: z.string().optional(),
    title: z.string().optional(),
});
export type SearchJournalEntryRequest = z.infer<typeof SearchJournalEntryRequestSchema>;