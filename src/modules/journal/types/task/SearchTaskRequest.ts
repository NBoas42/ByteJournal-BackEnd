import * as z from 'zod';
import { TaskStatusSchema } from './TaskStatus';

// TODO move to shared types
const DateFilterSchema = z.object({
    before: z.coerce.string().optional(),
    after: z.coerce.string().optional(),
}).optional();

export const SearchTaskRequestSchema = z.object({
    journalEntryId: z.string().optional(),
    accountId: z.string().optional(),
    status: TaskStatusSchema.optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    createdAt: DateFilterSchema,
    updatedAt: DateFilterSchema,
});
export type SearchTaskRequest = z.infer<typeof SearchTaskRequestSchema>;
