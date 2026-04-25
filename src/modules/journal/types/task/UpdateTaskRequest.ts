import * as z from 'zod';
import { TaskStatusSchema } from './TaskStatus';

export const UpdateTaskRequestSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string().nullable().optional(),
    status: TaskStatusSchema,
    finishedAt: z.coerce.date().nullable().optional(),
});
export type UpdateTaskRequest = z.infer<typeof UpdateTaskRequestSchema>;
