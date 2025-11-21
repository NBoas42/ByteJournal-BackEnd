import {Account} from '../dto/Account';
import { AppDataSource } from '../../shared/database/PostgresProvider';
import { AccountEntity } from '../entity/AccountEntity';

export class AccountPersistenceService {
      
        async getAccountById(id: string): Promise<Account> {
            await AppDataSource.initialize();
            const accountRepository = AppDataSource.getRepository(AccountEntity);
            const result = await accountRepository.findOne({ where:{ id } }) as Account;
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
