
export interface ApplicationConfig {
    auth: AuthConfig,
    database:DatabaseConfig
}

interface DatabaseConfig {
    userName: string;
    password: string;
    host: string;
    port:number;
    name:string;
    type: dbType;
}
type dbType = "mysql"| "postgres"| "sqlite";

interface AuthConfig {
    saltRounds: number;
    jwtSecret: string;
}
