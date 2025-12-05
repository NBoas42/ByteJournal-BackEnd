import { DataSource, Repository } from 'typeorm';

import { JournalEntryEntity } from '../entity/JournalEntryEntity';

import { JournalEntry } from '../dto/journal-entry/JournalEntry';
import { SearchJournalEntryRequest } from '../dto/journal-entry/SearchJournalEntryRequest';
import { CreateJournalEntryRequest } from '../dto/journal-entry/CreateJournalEntryRequest';
import { UpdateJournalEntryRequest } from '../dto/journal-entry/UpdateJournalEntryRequest';

export class JournalEntryPostgresResource {

        journalEntryRepository: Repository<JournalEntryEntity>;

        static get inject() {
            return ['DBConnection'];
        }

        constructor( dbConnection: DataSource){
            this.journalEntryRepository = dbConnection.getRepository(JournalEntryEntity);
        }

        async getJournalEntryById(id: string): Promise<JournalEntry> {
            const journalEntry = await this.journalEntryRepository.findOne({ where:{ id } });
            if(!journalEntry){
                // TODO  Add Better Error Handling to add status
                throw new Error('Not Found');
            }
            return journalEntry as JournalEntry;
        }

        async createJournalEntry (journalEntry: CreateJournalEntryRequest): Promise<JournalEntry> {
            const createdJournalEntry = await this.journalEntryRepository.save(journalEntry);
            if(!createdJournalEntry.id){
                throw new Error('Could Not Create JournalEntry')
            }
            return createdJournalEntry as JournalEntry;
        }
    
        async updateJournalEntryById (id: string, journalEntryToUpdate: UpdateJournalEntryRequest): Promise<boolean> {
            const result = await this.journalEntryRepository.update({id}, journalEntryToUpdate);
            return result.affected === 1 ? true:false;

        }
    
        async deleteJournalEntryById (id: string): Promise<boolean> {
            const result = await this.journalEntryRepository.delete({ id })
            return result.affected === 1 ? true:false;
        }

        // TODO Need to add Total (Tasks, Notes, Completed)
        // TODO Need to make it so that the title is regex if possible
        // TODO Need to search updated after before and between dates
        async searchJournalEntries (searchRequest: SearchJournalEntryRequest): Promise<JournalEntry[]> {
            const result = await this.journalEntryRepository.find({
                where: searchRequest
            })
            const journalEntrys = result.map(result => result as JournalEntry) || [];
            return journalEntrys;
        }
    
}
