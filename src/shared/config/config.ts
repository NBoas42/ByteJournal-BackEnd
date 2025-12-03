
export interface ApplicationConfig {
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
