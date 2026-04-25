import * as z from 'zod';

export const TaskStatusSchema = z.enum(['NOT_STARTED', 'STARTED', 'COMPLETED']);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
