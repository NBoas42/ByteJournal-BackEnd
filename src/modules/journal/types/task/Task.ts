import * as z from 'zod';
import { TaskStatusSchema } from './TaskStatus';

export const TaskSchema = z.object({
    id: z.string(),
    journalEntryId: z.string(),
    accountId: z.string(),
    title: z.string(),
    description: z.string().nullable().optional(),
    status: TaskStatusSchema,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    finishedAt: z.coerce.date().nullable().optional(),
});
export type Task = z.infer<typeof TaskSchema>;
