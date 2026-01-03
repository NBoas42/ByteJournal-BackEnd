import { AuthService } from '../../auth/service/AuthService';
import { Account } from '../types/Account';
import { AccountPostgresResource } from '../resource/postgres/AccountPostgresResouce';
import { RequestingAccountContext } from '../../shared/types/RequestingAccountContext';
import { UpdateAccountRequest } from '../types/UpdateAccountRequest';
import { CreateAccountRequest } from '../types/CreateAccountRequest';

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
      
        async getAccountById(id: string, requestingAccount: RequestingAccountContext): Promise<Account> {
            const account = await this.accountPostgresResource.getAccountById(id);
            const isOwner = account.id === requestingAccount.id;
            const isAdmin = requestingAccount.permissionType === "ADMIN";

            if(!isOwner && !isAdmin){
                throw new Error('FORBIDDEN: Acccount Does Not Belong To Requesting Account')
            }
            return account;
        }

        async createAccount (accountToCreate: CreateAccountRequest): Promise<boolean> {
            accountToCreate.password = await this.authService.hashPassword(accountToCreate.password);
            // TODO Create a Default Journal 
            // TODO resource should return data
            return this.accountPostgresResource.createAccount(accountToCreate);
        }
        
        async updateAccountById (id: string, accountToUpdate: UpdateAccountRequest, requestingAccount: RequestingAccountContext): Promise<boolean> {
            const account = await this.accountPostgresResource.getAccountById(id);
            const isOwner = account.id === requestingAccount.id;
            const isAdmin = requestingAccount.permissionType === "ADMIN";

            if(!isOwner && !isAdmin){
                throw new Error('FORBIDDEN: Acccount Does Not Belong To Requesting Account')
            }

            return this.accountPostgresResource.updateAccountById(id, accountToUpdate);
        }
    
        async deleteAccountById (id: string, requestingAccount: RequestingAccountContext): Promise<boolean> {
            const account = await this.accountPostgresResource.getAccountById(id);
            const isOwner = account.id === requestingAccount.id;
            const isAdmin = requestingAccount.permissionType === "ADMIN";

            if(!isOwner && !isAdmin){
                throw new Error('FORBIDDEN: Acccount Does Not Belong To Requesting Account')
            }

            return this.accountPostgresResource.deleteAccountById(id);
        }
    
}
