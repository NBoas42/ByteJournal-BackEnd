import {Account} from '../dto/Account';

export class AccountPersistenceService {

        async getAccountById(id: string): Promise<Account> {
            return {
                id: id,
                name: 'Nate Boas',
                email: 'nbboas+spam@gmail.com',
                picture: 'https://avatar.iran.liara.run/public/boy?username=Ash',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        }

        async createAccount (account: Account): Promise<boolean> {
            const isSuccessful  = true; 
            console.log(account);
            return isSuccessful;
        }
    
        async updateAccountById (id: string, accountToUpdate: Account): Promise<Account> {
            console.log(accountToUpdate);
            return {
                id: id,
                name: 'Nate Boas',
                email: 'nbboas+spam@gmail.com',
                picture: 'https://avatar.iran.liara.run/public/boy?username=Ash',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        }
    
        async deleteAccountById (id: string): Promise<boolean> {
            const isSuccessful  = true; 
            console.log(id);
            return isSuccessful;
        }
    
}