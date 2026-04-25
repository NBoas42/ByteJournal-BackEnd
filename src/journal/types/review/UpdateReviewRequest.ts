import * as z from 'zod';

export const UpdateReviewRequestSchema = z.object({
    id: z.string().optional(),
    content: z.string(),
    rating: z.number().int().nullable().optional(),
});
export type UpdateReviewRequest = z.infer<typeof UpdateReviewRequestSchema>;
