import * as z from 'zod';

export const CreateReviewRequestSchema = z.object({
    journalEntryId: z.string(),
    accountId: z.string(),
    content: z.string(),
    rating: z.number().int().nullable().optional(),
});
export type CreateReviewRequest = z.infer<typeof CreateReviewRequestSchema>;
