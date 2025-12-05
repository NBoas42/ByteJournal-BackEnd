"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalEntryPostgresResource = void 0;
const JournalEntryEntity_1 = require("../entity/JournalEntryEntity");
class JournalEntryPostgresResource {
    static get inject() {
        return ['DBConnection'];
    }
    constructor(dbConnection) {
        this.journalEntryRepository = dbConnection.getRepository(JournalEntryEntity_1.JournalEntryEntity);
    }
    async getJournalEntryById(id) {
        const journalEntry = await this.journalEntryRepository.findOne({ where: { id } });
        if (!journalEntry) {
            // TODO  Add Better Error Handling to add status
            throw new Error('Not Found');
        }
        return journalEntry;
    }
    async createJournalEntry(journalEntry) {
        const createdJournalEntry = await this.journalEntryRepository.save(journalEntry);
        if (!createdJournalEntry.id) {
            throw new Error('Could Not Create JournalEntry');
        }
        return createdJournalEntry;
    }
    async updateJournalEntryById(id, journalEntryToUpdate) {
        const result = await this.journalEntryRepository.update({ id }, journalEntryToUpdate);
        return result.affected === 1 ? true : false;
    }
    async deleteJournalEntryById(id) {
        const result = await this.journalEntryRepository.delete({ id });
        return result.affected === 1 ? true : false;
    }
    // TODO Need to add Total (Tasks, Notes, Completed)
    // TODO Need to make it so that the title is regex if possible
    // TODO Need to search updated after before and between dates
    async searchJournalEntries(searchRequest) {
        const result = await this.journalEntryRepository.find({
            where: searchRequest
        });
        const journalEntrys = result.map(result => result) || [];
        return journalEntrys;
    }
}
exports.JournalEntryPostgresResource = JournalEntryPostgresResource;
