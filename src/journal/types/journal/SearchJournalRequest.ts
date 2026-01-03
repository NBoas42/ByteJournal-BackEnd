import * as z from 'zod';
export const SearchJournalRequestSchema = z.object({
    accountId:z.string().optional(),
});
export type SearchJournalRequest = z.infer<typeof SearchJournalRequestSchema>;