
interface database {
    userName: string,
    password: string,
    URL: string,
}

interface ApplicationConfig {
    database:database
}