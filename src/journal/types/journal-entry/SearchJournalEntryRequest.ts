
import * as z from 'zod';

// TODO move to shared types
const DateFilterSchema = z.object({
    before: z.coerce.date().optional(),
    after: z.coerce.date().optional(),
}).optional();

export const SearchJournalEntryRequestSchema = z.object({
    accountId: z.string().optional(),
    journalId: z.string().optional(),
    title: z.string().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    createdAt: DateFilterSchema,
    updatedAt: DateFilterSchema,
});
export type SearchJournalEntryRequest = z.infer<typeof SearchJournalEntryRequestSchema>;