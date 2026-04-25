import * as z from 'zod';
export const UpdateJournalRequestSchema = z.object({
    title:z.string().optional(),
    description:z.string().optional(),
});
export type UpdateJournalRequest = z.infer<typeof UpdateJournalRequestSchema>;