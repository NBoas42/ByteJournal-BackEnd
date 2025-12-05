"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalPostgresResource = void 0;
const JournalEntity_1 = require("../entity/JournalEntity");
class JournalPostgresResource {
    static get inject() {
        return ['DBConnection'];
    }
    constructor(dbConnection) {
        this.journalRepository = dbConnection.getRepository(JournalEntity_1.JournalEntity);
    }
    async getJournalById(id) {
        const journal = await this.journalRepository.findOne({ where: { id } });
        if (!journal) {
            // TODO  Add Better Error Handling to add status
            throw new Error('Not Found');
        }
        return journal;
    }
    async createJournal(journal) {
        const createdJournal = await this.journalRepository.save(journal);
        if (!createdJournal.id) {
            throw new Error('Could Not Create Journal');
        }
        return createdJournal;
    }
    async updateJournalById(id, journalToUpdate) {
        const result = await this.journalRepository.update({ id }, journalToUpdate);
        return result.affected === 1 ? true : false;
    }
    async deleteJournalById(id) {
        const result = await this.journalRepository.delete({ id });
        return result.affected === 1 ? true : false;
    }
    async searchJournals(searchRequest) {
        const result = await this.journalRepository.find({
            where: searchRequest
        });
        const journals = result.map(result => result) || [];
        return journals;
    }
}
exports.JournalPostgresResource = JournalPostgresResource;
