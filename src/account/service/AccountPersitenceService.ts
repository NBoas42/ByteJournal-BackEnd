import {Account} from '../dto/Account';
import { AccountEntity } from '../entity/AccountEntity';
import { DataSource } from 'typeorm';

export class AccountPersistenceService {

        accountRepository: any;

        static get inject() {
            return ['DBConnection'];
        }

        constructor( dbConnection: DataSource){
            this.accountRepository = dbConnection.getRepository(AccountEntity);
        }
      
        async getAccountById(id: string): Promise<Account> {
            const result = await this.accountRepository.findOne({ where:{ id } }) as Account;
            return result;
        }

        async createAccount (account: Account): Promise<boolean> {
            const isSuccessful  = true; 
            console.log(account);
            return isSuccessful;
        }
    
        async updateAccountById (id: string, accountToUpdate: Account): Promise<Account> {
            console.log(accountToUpdate);
            return {
               ...accountToUpdate,
               id: id,
            }
        }
    
        async deleteAccountById (id: string): Promise<boolean> {
            const isSuccessful  = true; 
            console.log(id);
            return isSuccessful;
        }
    
}
