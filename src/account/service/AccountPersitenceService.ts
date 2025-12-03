import { Account } from '../dto/Account';
import { AccountPostgresResource } from '../resource/AccountPostgresResouce';

export class AccountPersistenceService {

        accountPostgresResource: AccountPostgresResource;

        static get inject() {
            return ['AccountPostgresResource'];
        }

        constructor( accountPostgresResource: AccountPostgresResource){
            this.accountPostgresResource = accountPostgresResource;
        }
      
        async getAccountById(id: string): Promise<Account> {
            return this.accountPostgresResource.getAccountById(id);
        }

        // TODO Add Specific DTO
        async createAccount (accountToCreate: Account): Promise<boolean> {
             return this.accountPostgresResource.createAccount(accountToCreate);
        }
        
        // TODO Add Specific DTO
        async updateAccountById (id: string, accountToUpdate: Account): Promise<boolean> {
             return this.accountPostgresResource.updateAccountById(id, accountToUpdate);
        }
    
        async deleteAccountById (id: string): Promise<boolean> {
             return this.accountPostgresResource.deleteAccountById(id);
        }
    
}
