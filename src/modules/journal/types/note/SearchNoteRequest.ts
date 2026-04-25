import * as z from 'zod';

// TODO move to shared types
const DateFilterSchema = z.object({
    before: z.coerce.string().optional(),
    after: z.coerce.string().optional(),
}).optional();

export const SearchNoteRequestSchema = z.object({
    journalEntryId: z.string().optional(),
    accountId: z.string().optional(),
    type: z.string().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    createdAt: DateFilterSchema,
    updatedAt: DateFilterSchema,
});
export type SearchNoteRequest = z.infer<typeof SearchNoteRequestSchema>;
