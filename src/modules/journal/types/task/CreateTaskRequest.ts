import * as z from 'zod';
import { TaskStatusSchema } from './TaskStatus';

export const CreateTaskRequestSchema = z.object({
    journalEntryId: z.string(),
    accountId: z.string(),
    title: z.string(),
    description: z.string().nullable().optional(),
    status: TaskStatusSchema,
    finishedAt: z.coerce.date().nullable().optional(),
});
export type CreateTaskRequest = z.infer<typeof CreateTaskRequestSchema>;
