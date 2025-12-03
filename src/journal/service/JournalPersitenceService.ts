import { Journal } from '../dto/Journal';
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

        // TODO Add Specific DTO
        async createJournal (journalToCreate: Journal): Promise<boolean> {
             return this.journalPostgresResource.createJournal(journalToCreate);
        }
        
        // TODO Add Specific DTO
        async updateJournalById (id: string, journalToUpdate: Journal): Promise<boolean> {
             return this.journalPostgresResource.updateJournalById(id, journalToUpdate);
        }
    
        async deleteJournalById (id: string): Promise<boolean> {
             return this.journalPostgresResource.deleteJournalById(id);
        }
    
}
