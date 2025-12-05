import { CreateJournalRequest } from '../dto/CreateJournalRequest';
import { Journal } from '../dto/Journal';
import { UpdateJournalRequest } from '../dto/UpdateJournalRequest';
import { JournalPostgresResource } from '../resource/JournalPostgresResouce';

export class JournalPersistenceService {

        journalPostgresResource: JournalPostgresResource;

        static get inject() {
            return ['JournalPostgresResource'];
        }

        constructor( journalPostgresResource: JournalPostgresResource){
            this.journalPostgresResource = journalPostgresResource;
        }
      
        async getJournalById(id: string): Promise<Journal> {
            return this.journalPostgresResource.getJournalById(id);
        }

        async createJournal (journalToCreate: CreateJournalRequest): Promise<Journal> {
            // Check if Account Exists
             return this.journalPostgresResource.createJournal(journalToCreate);
        }
        
        // TODO Add Specific DTO
        async updateJournalById (id: string, journalToUpdate: UpdateJournalRequest): Promise<boolean> {
             return this.journalPostgresResource.updateJournalById(id, journalToUpdate);
        }
    
        async deleteJournalById (id: string): Promise<boolean> {
             return this.journalPostgresResource.deleteJournalById(id);
        }
    
}
