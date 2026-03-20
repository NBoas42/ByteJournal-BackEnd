import { JournalEntry } from '../types/journal-entry/JournalEntry';

import { CreateJournalEntryRequest } from '../types/journal-entry/CreateJournalEntryRequest';
import { SearchJournalEntryRequest } from '../types/journal-entry/SearchJournalEntryRequest';
import { UpdateJournalEntryRequest } from '../types/journal-entry/UpdateJournalEntryRequest';

import { JournalEntryPostgresResource } from '../resource/postgres/JournalEntryPostgresResource';
import { RequestingAccountContext } from '../../shared/types/RequestingAccountContext';

export class JournalEntryPersistenceService {

        journalEntryPostgresResource: JournalEntryPostgresResource;

        static get inject() {
            return [
                'JournalEntryPostgresResource',
            ];
        }

        constructor( journalEntryPostgresResource: JournalEntryPostgresResource ){
            this.journalEntryPostgresResource = journalEntryPostgresResource;
        }
      
        async getJournalEntryById(id: string, requestingAccount: RequestingAccountContext): Promise<JournalEntry> {
        const journalEntry = await this.journalEntryPostgresResource.getJournalEntryById(id);
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
        const journalEntry = await this.journalEntryPostgresResource.getJournalEntryById(id);
        const isOwner = journalEntry.accountId === requestingAccount.id;
        const isAdmin = requestingAccount.permissionType === "ADMIN";
        if(!isOwner && !isAdmin){
            throw new Error('FORBIDDEN: Journal Entry Does Not Belong To User')
        }            
             return this.journalEntryPostgresResource.updateJournalEntryById(id, journalEntryToUpdate);
        }
    
        async deleteJournalEntryById (id: string, requestingAccount: RequestingAccountContext): Promise<boolean> {
        const journalEntry = await this.journalEntryPostgresResource.getJournalEntryById(id);
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
        async searchJournalEntriesWithRelations (searchRequest: SearchJournalEntryRequest, requestingAccount: RequestingAccountContext): Promise<JournalEntry[]> {
            if(requestingAccount.permissionType === "ADMIN"){
                 return this.journalEntryPostgresResource.searchJournalEntriesWithRelations(searchRequest);
            }
            return this.journalEntryPostgresResource.searchJournalEntriesWithRelations({
                ...searchRequest,
                accountId: requestingAccount.id
            });
        }
    
}
