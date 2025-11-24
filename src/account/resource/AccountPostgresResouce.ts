import { Account } from '../dto/Account';
import { AccountEntity } from '../entity/AccountEntity';
import { DataSource, Repository } from 'typeorm';

export class AccountPostgresResource {

        accountRepository: Repository<AccountEntity>;

        static get inject() {
            return ['DBConnection'];
        }

        constructor( dbConnection: DataSource){
            this.accountRepository = dbConnection.getRepository(AccountEntity);
        }

        adaptEntityToAccountResponse(accountEntity:AccountEntity): Account{
            return accountEntity as Account;
        }
      
        async getAccountById(id: string): Promise<Account> {
            const account = await this.accountRepository.findOne({ where:{ id } });
            if(!account){
                // TODO  Add Better Error Handling to add status
                throw new Error('Not Found');
            }
            return this.adaptEntityToAccountResponse(account);
        }

        // TODO Create DTO 
        async createAccount (account: Account): Promise<boolean> {
            const result = this.accountRepository.create(account);
            if(!result){
                return false;
            }
            return true;
        }
    
        // TODO Create DTO 
        async updateAccountById (id: string, accountToUpdate: Account): Promise<boolean> {
            const result = await this.accountRepository.update({id}, accountToUpdate);
            return result.affected === 1 ? true:false;;

        }
    
        async deleteAccountById (id: string): Promise<boolean> {
            const result = await this.accountRepository.delete({ id })
            return result.affected === 1 ? true:false;
        }
    
}
