import { JournalEntry, JournalEntryWithRelations } from '../types/journal-entry/JournalEntry';

import { CreateJournalEntryRequest } from '../types/journal-entry/CreateJournalEntryRequest';
import { SearchJournalEntryRequest } from '../types/journal-entry/SearchJournalEntryRequest';
import { UpdateJournalEntryRequest } from '../types/journal-entry/UpdateJournalEntryRequest';

import { Note } from '../types/note/Note';
import { UpdateNoteRequest } from '../types/note/UpdateNoteRequest';
import { Task } from '../types/task/Task';
import { UpdateTaskRequest } from '../types/task/UpdateTaskRequest';
import { Review } from '../types/review/Review';
import { UpdateReviewRequest } from '../types/review/UpdateReviewRequest';

import { JournalEntryPostgresResource } from '../resource/postgres/JournalEntryPostgresResource';
import { NotePostgresResource } from '../resource/postgres/NotePostgresResource';
import { TaskPostgresResource } from '../resource/postgres/TaskPostgresResource';
import { ReviewPostgresResource } from '../resource/postgres/ReviewPostgresResource';
import { RequestingAccountContext } from '../../shared/types/RequestingAccountContext';

export class JournalEntryPersistenceService {

        journalEntryPostgresResource: JournalEntryPostgresResource;
        notePostgresResource: NotePostgresResource;
        taskPostgresResource: TaskPostgresResource;
        reviewPostgresResource: ReviewPostgresResource;

        static get inject() {
            return [
                'JournalEntryPostgresResource',
                'NotePostgresResource',
                'TaskPostgresResource',
                'ReviewPostgresResource',
            ];
        }

        constructor(
            journalEntryPostgresResource: JournalEntryPostgresResource,
            notePostgresResource: NotePostgresResource,
            taskPostgresResource: TaskPostgresResource,
            reviewPostgresResource: ReviewPostgresResource,
        ){
            this.journalEntryPostgresResource = journalEntryPostgresResource;
            this.notePostgresResource = notePostgresResource;
            this.taskPostgresResource = taskPostgresResource;
            this.reviewPostgresResource = reviewPostgresResource;
        }
      
        async getJournalEntryByIdWithRelations(id: string, requestingAccount: RequestingAccountContext): Promise<JournalEntry> {
        const journalEntry = await this.journalEntryPostgresResource.getJournalEntryByIdWithRelations(id);
        const isOwner = journalEntry.accountId === requestingAccount.id;
        const isAdmin = requestingAccount.permissionType === "ADMIN";
        if(!isOwner && !isAdmin){
            throw new Error('FORBIDDEN: Journal Entry Does Not Belong To User')
        }
            return journalEntry;
        }

        async createJournalEntry (journalEntryToCreate: CreateJournalEntryRequest): Promise<JournalEntry> {
            return this.journalEntryPostgresResource.createJournalEntry(journalEntryToCreate);
        }
        
        // TODO Make this update with relations
        async updateJournalEntryById (id: string, journalEntryToUpdate: UpdateJournalEntryRequest, requestingAccount: RequestingAccountContext): Promise<boolean> {
            const journalEntry = await this.journalEntryPostgresResource.getJournalEntryByIdWithRelations(id);
            const isOwner = journalEntry.accountId === requestingAccount.id;
            const isAdmin = requestingAccount.permissionType === "ADMIN";
            if(!isOwner && !isAdmin){
                throw new Error('FORBIDDEN: Journal Entry Does Not Belong To User')
            }            
             return this.journalEntryPostgresResource.updateJournalEntryById(id, journalEntryToUpdate);
        }


        async updateJournalEntryByIdWithRelations (id: string, journalEntryToUpdate: UpdateJournalEntryRequest, requestingAccount: RequestingAccountContext): Promise<JournalEntryWithRelations> {
            // Pull out the notes, tasks, and review from the journalEntryToUpdate and assign them to their own variable
            const { notes, tasks, review, ...journalEntryFields } = journalEntryToUpdate;
            const existingJournalEntry = await this.journalEntryPostgresResource.getJournalEntryByIdWithRelations(id);
            const isOwner = existingJournalEntry.accountId === requestingAccount.id;
            const isAdmin = requestingAccount.permissionType === "ADMIN";

            const updateCreateDeleteNotes = async (existingNotes: Note[], requestedNotes: UpdateNoteRequest[]) => {
                const notesToCreate = requestedNotes.filter(note => !note.id);
                const notesToUpdate = requestedNotes.filter(note => note.id);
                const notesToDelete = existingNotes.filter(existing => !requestedNotes.some(note => note.id === existing.id));

                for(const note of notesToCreate){
                    await this.notePostgresResource.createNote({
                        journalEntryId: id,
                        accountId: existingJournalEntry.accountId,
                        content: note.content,
                        type: note.type,
                    });
                }

                for(const note of notesToUpdate){
                    await this.notePostgresResource.updateNoteById(note.id!, {
                        content: note.content,
                        type: note.type,
                    });
                }

                for(const note of notesToDelete){
                    await this.notePostgresResource.deleteNoteById(note.id);
                }
            };

            const updateCreateDeleteTasks = async (existingTasks: Task[], requestedTasks: UpdateTaskRequest[]) => {
                const tasksToCreate = requestedTasks.filter(task => !task.id);
                const tasksToUpdate = requestedTasks.filter(task => task.id);
                const tasksToDelete = existingTasks.filter(existing => !requestedTasks.some(task => task.id === existing.id));

                for(const task of tasksToCreate){
                    await this.taskPostgresResource.createTask({
                        journalEntryId: id,
                        accountId: existingJournalEntry.accountId,
                        title: task.title,
                        description: task.description,
                        status: task.status,
                        finishedAt: task.finishedAt,
                    });
                }

                for(const task of tasksToUpdate){
                    await this.taskPostgresResource.updateTaskById(task.id!, {
                        title: task.title,
                        description: task.description,
                        status: task.status,
                        finishedAt: task.finishedAt,
                    });
                }

                for(const task of tasksToDelete){
                    await this.taskPostgresResource.deleteTaskById(task.id);
                }
            };

            if(!isOwner && !isAdmin){
                throw new Error('FORBIDDEN: Journal Entry Does Not Belong To User')
            }

            await updateCreateDeleteNotes(existingJournalEntry.notes, notes!);
            

            if(tasks){
                await updateCreateDeleteTasks(existingJournalEntry.tasks, tasks);
            }

            if(review){
                await this.reviewPostgresResource.updateReviewById(existingJournalEntry.review.id, {
                    content: review.content,
                    rating: review.rating,
                });
            }

            if(Object.keys(journalEntryFields).length > 0){
                await this.journalEntryPostgresResource.updateJournalEntryById(id, journalEntryFields);
            }

            return this.journalEntryPostgresResource.getJournalEntryByIdWithRelations(id);
        }
    
        async deleteJournalEntryById (id: string, requestingAccount: RequestingAccountContext): Promise<boolean> {
        const journalEntry = await this.journalEntryPostgresResource.getJournalEntryByIdWithRelations(id);
        const isOwner = journalEntry.accountId === requestingAccount.id;
        const isAdmin = requestingAccount.permissionType === "ADMIN";
        if(!isOwner && !isAdmin){
            throw new Error('FORBIDDEN: Journal Entry Does Not Belong To User')
        }
            return this.journalEntryPostgresResource.deleteJournalEntryById(id);
        }

        // TODO Need to add Total (Tasks, Notes, Completed)
        // TODO Need to make it so that the title is regex if possible
        // TODO Add Pagination
        async searchJournalEntriesWithRelations (journalId: string, searchRequest: SearchJournalEntryRequest, requestingAccount: RequestingAccountContext): Promise<JournalEntry[]> {
            if(requestingAccount.permissionType === "ADMIN"){
                 return this.journalEntryPostgresResource.searchJournalEntriesWithRelations({
                    ...searchRequest,
                    journalId: journalId
                 });
            }
            return this.journalEntryPostgresResource.searchJournalEntriesWithRelations({
                ...searchRequest,
                accountId: requestingAccount.id,
                journalId: journalId
            });
        }
    
}
