import { CreateJournalRequest } from '../dto/journal/CreateJournalRequest';
import { UpdateJournalRequest } from '../dto/journal/UpdateJournalRequest';
import { Journal } from '../dto/journal/Journal';

import { JournalEntity } from '../entity/JournalEntity';

import { DataSource, Repository } from 'typeorm';
import { SearchJournalRequest } from '../dto/journal/SearchJournalRequest';

export class JournalPostgresResource {

        journalRepository: Repository<JournalEntity>;

        static get inject() {
            return ['DBConnection'];
        }

        constructor( dbConnection: DataSource){
            this.journalRepository = dbConnection.getRepository(JournalEntity);
        }

        async getJournalById(id: string): Promise<Journal> {
            const journal = await this.journalRepository.findOne({ where:{ id } });
            if(!journal){
                // TODO  Add Better Error Handling to add status
                throw new Error('Not Found');
            }
            return journal as Journal;
        }

        async createJournal (journal: CreateJournalRequest): Promise<Journal> {
            const createdJournal = await this.journalRepository.save(journal);
            if(!createdJournal.id){
                throw new Error('Could Not Create Journal')
            }
            return createdJournal as Journal;
        }
    
        async updateJournalById (id: string, journalToUpdate: UpdateJournalRequest): Promise<boolean> {
            const result = await this.journalRepository.update({id}, journalToUpdate);
            return result.affected === 1 ? true:false;

        }
    
        async deleteJournalById (id: string): Promise<boolean> {
            const result = await this.journalRepository.delete({ id })
            return result.affected === 1 ? true:false;
        }

        async searchJournals (searchRequest: SearchJournalRequest): Promise<Journal[]> {
            const result = await this.journalRepository.find({
                where: searchRequest
            })
            const journals = result.map(result => result as Journal) || [];
            return journals;
        }
    
}
