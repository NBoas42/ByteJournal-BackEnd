import { Journal } from '../types/journal/Journal';
import { SearchJournalRequest } from '../types/journal/SearchJournalRequest';
import { CreateJournalRequest } from '../types/journal/CreateJournalRequest';
import { UpdateJournalRequest } from '../types/journal/UpdateJournalRequest';
import { RequestingAccountContext } from '../../../shared/types/RequestingAccountContext';

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
      
        async getJournalById(id: string, requestingAccount: RequestingAccountContext): Promise<Journal> {
            const journal = await this.journalPostgresResource.getJournalById(id);
            const isOwner = journal.accountId === requestingAccount.id;
            const isAdmin = requestingAccount.permissionType === "ADMIN";

            if(!isOwner && !isAdmin){
                throw new Error('FORBIDDEN: Journal Does Not Belong To Requesting Account')
            }

            return journal;
        }

        async createJournal (journalToCreate: CreateJournalRequest): Promise<Journal> {
            return this.journalPostgresResource.createJournal(journalToCreate);
        }
        
        async updateJournalById (id: string, journalToUpdate: UpdateJournalRequest, requestingAccount: RequestingAccountContext): Promise<boolean> {
            const journal = await this.journalPostgresResource.getJournalById(id);
            const isOwner = journal.accountId === requestingAccount.id;
            const isAdmin = requestingAccount.permissionType === "ADMIN";

            if(!isOwner && !isAdmin){
                throw new Error('FORBIDDEN: Journal Does Not Belong To Requesting Account')
            }

            return this.journalPostgresResource.updateJournalById(id, journalToUpdate);
        }
    
        async deleteJournalById (id: string, requestingAccount: RequestingAccountContext): Promise<boolean> {
            const journal = await this.journalPostgresResource.getJournalById(id);
            const isOwner = journal.accountId === requestingAccount.id;
            const isAdmin = requestingAccount.permissionType === "ADMIN";

            if(!isOwner && !isAdmin){
                throw new Error('FORBIDDEN: Journal Does Not Belong To Requesting Account')
            }

             return this.journalPostgresResource.deleteJournalById(id);
        }

        async searchJournals (searchRequest: SearchJournalRequest, requestingAccount: RequestingAccountContext): Promise<Journal[]> {
            if(requestingAccount.permissionType === "ADMIN"){
                return this.journalPostgresResource.searchJournals(searchRequest);
            }

            return this.journalPostgresResource.searchJournals({
                ...searchRequest,
                accountId: requestingAccount.id
            });
        }
    
}
