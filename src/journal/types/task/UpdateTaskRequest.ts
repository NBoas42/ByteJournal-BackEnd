import * as z from 'zod';

export const UpdateTaskRequestSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string().nullable().optional(),
    status: z.enum(['NOT_STARTED', 'STARTED', 'COMPLETED']),
    finishedAt: z.coerce.date().nullable().optional(),
});
export type UpdateTaskRequest = z.infer<typeof UpdateTaskRequestSchema>;
