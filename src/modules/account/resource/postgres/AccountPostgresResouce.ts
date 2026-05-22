import { Account } from '../../types/Account';
import { CreateAccountRequest } from '../../types/CreateAccountRequest';
import { UpdateAccountRequest } from '../../types/UpdateAccountRequest';
import { AccountEntity } from './AccountEntity';
import { DataSource, Repository } from 'typeorm';

export class AccountPostgresResource {

        accountRepository: Repository<AccountEntity>;

        static get inject() {
            return ['DBConnection'];
        }

        constructor( dbConnection: DataSource){
            this.accountRepository = dbConnection.getRepository(AccountEntity);
        }
      
        async getAccountById(id: string): Promise<Account> {
            const account = await this.accountRepository.findOne({ where:{ id } });
            if(!account){
                throw new Error('Not Found');
            }
            return account as Account;
        }


        async getAccountByEmail(email: string): Promise<Account> {
            const account = await this.accountRepository.findOne({ where:{ email } });
            if(!account){
                throw new Error('Not Found');
            }
            return account as Account;
        }


        // TODO Add Specific DTO
        async createAccount (account: CreateAccountRequest, permissionType: string = "USER"): Promise<boolean> {
            const result = await this.accountRepository.save({
                ...account,
                permissionType: 'USER',
            });
            if(!result.id){
                return false;
            }
            return true;
        }
    
        // TODO Add Specific DTO
        async updateAccountById (id: string, accountToUpdate: UpdateAccountRequest): Promise<boolean> {
            const result = await this.accountRepository.update({id}, accountToUpdate);
            return result.affected === 1 ? true:false;

        }
    
        async deleteAccountById (id: string): Promise<boolean> {
            const result = await this.accountRepository.delete({ id }); // TODO Add soft delete
            return result.affected === 1 ? true:false;
        }
    
}
