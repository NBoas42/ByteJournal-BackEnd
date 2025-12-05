"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalEntryPersistenceService = void 0;
class JournalEntryPersistenceService {
    static get inject() {
        return [
            'JournalEntryPostgresResource',
        ];
    }
    constructor(journalEntryPostgresResource) {
        this.journalEntryPostgresResource = journalEntryPostgresResource;
    }
    async getJournalEntryById(id) {
        return this.journalEntryPostgresResource.getJournalEntryById(id);
    }
    async createJournalEntry(journalEntryToCreate) {
        return this.journalEntryPostgresResource.createJournalEntry(journalEntryToCreate);
    }
    // TODO Make this update with relations
    async updateJournalEntryById(id, journalEntryToUpdate) {
        return this.journalEntryPostgresResource.updateJournalEntryById(id, journalEntryToUpdate);
    }
    async deleteJournalEntryById(id) {
        return this.journalEntryPostgresResource.deleteJournalEntryById(id);
    }
    // TODO Need to add Total (Tasks, Notes, Completed)
    // TODO Need to make it so that the title is regex if possible
    // TODO Add Pagination
    async searchJournalEntries(searchRequest) {
        return this.journalEntryPostgresResource.searchJournalEntries(searchRequest);
    }
}
exports.JournalEntryPersistenceService = JournalEntryPersistenceService;
