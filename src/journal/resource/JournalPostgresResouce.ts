import { Journal } from '../dto/Journal';
import { JournalEntity } from '../entity/JournalEntity';
import { DataSource, Repository } from 'typeorm';

export class JournalPostgresResource {

        journalRepository: Repository<JournalEntity>;

        static get inject() {
            return ['DBConnection'];
        }

        constructor( dbConnection: DataSource){
            this.journalRepository = dbConnection.getRepository(JournalEntity);
        }

        adaptEntityToJournalResponse(journalEntity:JournalEntity): Journal{
            return journalEntity as Journal;
        }
      
        async getJournalById(id: string): Promise<Journal> {
            const journal = await this.journalRepository.findOne({ where:{ id } });
            if(!journal){
                // TODO  Add Better Error Handling to add status
                throw new Error('Not Found');
            }
            return this.adaptEntityToJournalResponse(journal);
        }

        // TODO Add Specific DTO
        // TODO Return Created Journal
        async createJournal (journal: Journal): Promise<boolean> {
            const result = await this.journalRepository.save(journal);
            if(!result.id){
                return false;
            }
            return true;
        }
    
        // TODO Add Specific DTO
        async updateJournalById (id: string, journalToUpdate: Journal): Promise<boolean> {
            const result = await this.journalRepository.update({id}, journalToUpdate);
            return result.affected === 1 ? true:false;

        }
    
        async deleteJournalById (id: string): Promise<boolean> {
            const result = await this.journalRepository.delete({ id })
            return result.affected === 1 ? true:false;
        }
    
}
