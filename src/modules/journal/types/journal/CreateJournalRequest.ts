

import * as z from 'zod';
export const CreateJournalRequestSchema = z.object({
    accountId:z.string(),
    title:z.string(),
    description:z.string().optional(),
});
export type CreateJournalRequest = z.infer<typeof CreateJournalRequestSchema>;