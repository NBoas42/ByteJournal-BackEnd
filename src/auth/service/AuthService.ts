import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ApplicationConfig } from "../../shared/config/config";
import { AccountPostgresResource } from "../../account/resource/AccountPostgresResouce";
import config from '../../shared/config/config.json';


export class AuthService {

    accountPostgresResource: AccountPostgresResource;
    config: ApplicationConfig;
    
        static get inject() {
            return [
                'AccountPostgresResource',
            ];
        }
    
        constructor( journalEntryPostgresResource: AccountPostgresResource ){
            this.accountPostgresResource = journalEntryPostgresResource;
            this.config = config as ApplicationConfig;
        }

async authenticateJWTToken(token: string): Promise<{ id: string }> {
  const decoded = jwt.verify(token, this.config.auth.jwtSecret) as { id: string };
  const account = await this.accountPostgresResource.getAccountById(decoded.id);
  if (!account) {
    throw new Error('Invalid token');
  }
  return { id: account.id };
}

    async hashPassword (password: string): Promise<string> {
        return bcrypt.hash(password, this.config.auth.saltRounds);
    }

    async login (email: string, password:string): Promise<string> {
        let account = await this.accountPostgresResource.getAccountByEmail(email);

        if(!account.id){
            throw new Error('User Name Or Password Incorrect');
        }

        if(!bcrypt.compareSync(password,account.password)){
            throw new Error('User Name Or Password Incorrect');
        }

        const token = jwt.sign(
            { id: account.id },
            this.config.auth.jwtSecret,
            { expiresIn: '1h' }
        )

        return token;
    }

    async changePassword (email: string, oldPassword: string, newPassword: string): Promise<boolean> {
        return true;
    }
}