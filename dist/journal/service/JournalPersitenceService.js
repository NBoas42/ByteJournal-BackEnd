"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalPersistenceService = void 0;
class JournalPersistenceService {
    static get inject() {
        return [
            'JournalPostgresResource',
        ];
    }
    constructor(journalPostgresResource) {
        this.journalPostgresResource = journalPostgresResource;
    }
    async getJournalById(id) {
        return this.journalPostgresResource.getJournalById(id);
    }
    async createJournal(journalToCreate) {
        return this.journalPostgresResource.createJournal(journalToCreate);
    }
    async updateJournalById(id, journalToUpdate) {
        return this.journalPostgresResource.updateJournalById(id, journalToUpdate);
    }
    async deleteJournalById(id) {
        return this.journalPostgresResource.deleteJournalById(id);
    }
    async searchJournals(searchRequest) {
        return this.journalPostgresResource.searchJournals(searchRequest);
    }
}
exports.JournalPersistenceService = JournalPersistenceService;
