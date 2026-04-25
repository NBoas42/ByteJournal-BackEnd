import * as z from 'zod';
import { NoteSchema } from '../note/Note';
import { TaskSchema } from '../task/Task';
import { ReviewSchema } from '../review/Review';

export const JournalEntrySchema = z.object({
    id: z.string(),
    journalId: z.string(),
    accountId: z.string(),
    title: z.string(),
    tags: z.array(z.string()).optional(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const JournalEntryWithRelationsSchema = JournalEntrySchema.extend({
    notes: z.array(NoteSchema),
    tasks: z.array(TaskSchema),
    review: ReviewSchema.nullable(),
});

export type JournalEntry = z.infer<typeof JournalEntrySchema>;
export type JournalEntryWithRelations = z.infer<typeof JournalEntryWithRelationsSchema>;