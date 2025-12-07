import { AuthService } from '../../auth/service/AuthService';
import { Account } from '../dto/Account';
import { AccountPostgresResource } from '../resource/AccountPostgresResouce';

export class AccountPersistenceService {

        accountPostgresResource: AccountPostgresResource;
        authService: AuthService;

        static get inject() {
            return [
                'AccountPostgresResource',
                'AuthService'
            ];
        }

        constructor( accountPostgresResource: AccountPostgresResource, authService: AuthService){
            this.accountPostgresResource = accountPostgresResource;
            this.authService = authService;
        }
      
        async getAccountById(id: string): Promise<Account> {
            return this.accountPostgresResource.getAccountById(id);
        }

        async createAccount (accountToCreate: Account): Promise<boolean> {
            if(accountToCreate.password){
                accountToCreate.password = await this.authService.hashPassword(accountToCreate.password);
            }
            // TODO Create a Default Journal 
            // TODO resource should return data
            return this.accountPostgresResource.createAccount(accountToCreate);
        }
        
        async updateAccountById (id: string, accountToUpdate: Account): Promise<boolean> {
             return this.accountPostgresResource.updateAccountById(id, accountToUpdate);
        }
    
        async deleteAccountById (id: string): Promise<boolean> {
             return this.accountPostgresResource.deleteAccountById(id);
        }
    
}
