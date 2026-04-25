import * as z from 'zod';
import { UpdateNoteRequestSchema } from '../note/UpdateNoteRequest';
import { UpdateTaskRequestSchema } from '../task/UpdateTaskRequest';
import { UpdateReviewRequestSchema } from '../review/UpdateReviewRequest';

export const UpdateJournalEntryRequestSchema = z.object({
    title: z.string().optional(),
    tags: z.array(z.string()).optional(),
    notes: z.array(UpdateNoteRequestSchema),
    tasks: z.array(UpdateTaskRequestSchema),
    review: UpdateReviewRequestSchema,
});
export type UpdateJournalEntryRequest = z.infer<typeof UpdateJournalEntryRequestSchema>;