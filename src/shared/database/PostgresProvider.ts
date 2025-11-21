import { DataSource } from "typeorm"
import { AccountEntity } from '../../account/entity/AccountEntity';
import { JournalEntity } from '../../journal/entity/JournalEntity';
import { ApplicationConfig } from "../config/config";
import { JournalEntryEntity } from "../../journal/entity/JournalEntryEntity";
import { NoteEntity } from "../../journal/entity/NoteEntity";
import { ReviewEntity } from "../../journal/entity/ReviewEntity";
import { TaskEntity } from "../../journal/entity/TaskEntity";
import { ScratchPadEntity } from "../../journal/entity/ScratchPadEntity";

const applcationConfig: ApplicationConfig = require('../config/config.json');

export const AppDataSource = new DataSource({
    type: applcationConfig.database.type,
    host: applcationConfig.database.host,
    port: applcationConfig.database.port,
    username: applcationConfig.database.userName,
    password: applcationConfig.database.password,
    database: applcationConfig.database.name,
    entities: [
        AccountEntity, 
        JournalEntity,
        ScratchPadEntity, 
        JournalEntryEntity, 
        NoteEntity, 
        ReviewEntity, 
        TaskEntity, 
    ],
    synchronize: false,
    logging: false,
});


// try {
//     await AppDataSource.initialize()
// } catch (error) {
//     console.log(error)
// }