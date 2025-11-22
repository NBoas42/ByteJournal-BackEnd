"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataDBConnection = createDataDBConnection;
// orm.ts
const typeorm_1 = require("typeorm");
const AccountEntity_1 = require("../../account/entity/AccountEntity");
const JournalEntity_1 = require("../../journal/entity/JournalEntity");
const JournalEntryEntity_1 = require("../../journal/entity/JournalEntryEntity");
const NoteEntity_1 = require("../../journal/entity/NoteEntity");
const ReviewEntity_1 = require("../../journal/entity/ReviewEntity");
const TaskEntity_1 = require("../../journal/entity/TaskEntity");
const ScratchPadEntity_1 = require("../../journal/entity/ScratchPadEntity");
const applicationConfig = require('../config/config.json');
async function createDataDBConnection() {
    const dataSource = new typeorm_1.DataSource({
        type: applicationConfig.database.type,
        host: applicationConfig.database.host,
        port: applicationConfig.database.port,
        username: applicationConfig.database.userName,
        password: applicationConfig.database.password,
        database: applicationConfig.database.name,
        entities: [
            AccountEntity_1.AccountEntity,
            JournalEntity_1.JournalEntity,
            ScratchPadEntity_1.ScratchPadEntity,
            JournalEntryEntity_1.JournalEntryEntity,
            NoteEntity_1.NoteEntity,
            ReviewEntity_1.ReviewEntity,
            TaskEntity_1.TaskEntity,
        ],
        synchronize: false,
        logging: false,
    });
    return dataSource.initialize();
}
