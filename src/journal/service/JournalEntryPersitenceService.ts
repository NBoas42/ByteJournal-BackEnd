import { JournalEntry } from '../types/journal-entry/JournalEntry';

import { CreateJournalEntryRequest } from '../types/journal-entry/CreateJournalEntryRequest';
import { SearchJournalEntryRequest } from '../types/journal-entry/SearchJournalEntryRequest';
import { UpdateJournalEntryRequest } from '../types/journal-entry/UpdateJournalEntryRequest';

import { JournalEntryPostgresResource } from '../resource/postgres/JournalEntryPostgresResource';

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
      
        async getJournalEntryById(id: string): Promise<JournalEntry> {
            return this.journalEntryPostgresResource.getJournalEntryById(id);
        }

        async createJournalEntry (journalEntryToCreate: CreateJournalEntryRequest): Promise<JournalEntry> {
            // Check If Journal Exists First
            return this.journalEntryPostgresResource.createJournalEntry(journalEntryToCreate);
        }
        
        // TODO Make this update with relations
        async updateJournalEntryById (id: string, journalEntryToUpdate: UpdateJournalEntryRequest): Promise<boolean> {
             return this.journalEntryPostgresResource.updateJournalEntryById(id, journalEntryToUpdate);
        }
    
        async deleteJournalEntryById (id: string): Promise<boolean> {
             return this.journalEntryPostgresResource.deleteJournalEntryById(id);
        }

        // TODO Need to add Total (Tasks, Notes, Completed)
        // TODO Need to make it so that the title is regex if possible
        // TODO Add Pagination
        async searchJournalEntries (searchRequest: SearchJournalEntryRequest): Promise<JournalEntry[]> {
            return this.journalEntryPostgresResource.searchJournalEntries(searchRequest);
        }
    
}
