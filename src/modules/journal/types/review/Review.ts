import * as z from 'zod';

export const ReviewSchema = z.object({
    id: z.string(),
    journalEntryId: z.string(),
    accountId: z.string(),
    content: z.string(),
    rating: z.number().int().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});
export type Review = z.infer<typeof ReviewSchema>;
