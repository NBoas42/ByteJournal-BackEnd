import { Journal } from '../types/journal/Journal';
import { SearchJournalRequest } from '../types/journal/SearchJournalRequest';
import { CreateJournalRequest } from '../types/journal/CreateJournalRequest';
import { UpdateJournalRequest } from '../types/journal/UpdateJournalRequest';

import { JournalPostgresResource } from '../resource/postgres/JournalPostgresResouce';

export class JournalPersistenceService {

        journalPostgresResource: JournalPostgresResource;

        static get inject() {
            return [
                'JournalPostgresResource',
            ];
        }

        constructor( journalPostgresResource: JournalPostgresResource ){
            this.journalPostgresResource = journalPostgresResource;
        }
      
        async getJournalById(id: string): Promise<Journal> {
            return this.journalPostgresResource.getJournalById(id);
        }

        async createJournal (journalToCreate: CreateJournalRequest): Promise<Journal> {
            return this.journalPostgresResource.createJournal(journalToCreate);
        }
        
        async updateJournalById (id: string, journalToUpdate: UpdateJournalRequest): Promise<boolean> {
             return this.journalPostgresResource.updateJournalById(id, journalToUpdate);
        }
    
        async deleteJournalById (id: string): Promise<boolean> {
             return this.journalPostgresResource.deleteJournalById(id);
        }

        async searchJournals (searchRequest: SearchJournalRequest): Promise<Journal[]> {
            return this.journalPostgresResource.searchJournals(searchRequest);
        }
    
}
