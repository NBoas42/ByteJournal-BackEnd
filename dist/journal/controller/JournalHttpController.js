"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalHTTPController = void 0;
class JournalHTTPController {
    static get inject() {
        return [
            'JournalPersistenceService',
            'JournalEntryPersistenceService'
        ];
    }
    constructor(journalPersistenceService, journalEntryPersistenceService) {
        this.journalPersistenceService = journalPersistenceService;
        this.journalEntryPersistenceService = journalEntryPersistenceService;
    }
    // <---------Journal-------------->
    // TODO Add Validation to Request
    // TODO Add Journal Role Admin Access Only
    async searchJournal(request) {
        const { accountId } = request.query;
        const searchRequest = {
            accountId: accountId,
        };
        const journals = await this.journalPersistenceService.searchJournals(searchRequest);
        return {
            errors: [],
            status: 200,
            data: journals
        };
    }
    // TODO Add Validation to Request
    // TODO Add Journal Role User Owner Or Admin Only
    async getJournalById(request) {
        const { params } = request;
        const journal = await this.journalPersistenceService.getJournalById(params.id);
        return {
            errors: [],
            status: 200,
            data: journal
        };
    }
    // TODO Add Validation to Request
    // TODO Add Journal Role User Owner Or Admin Only
    async createJournal(request) {
        const { body: journalToCreate } = request;
        const createdJournal = await this.journalPersistenceService.createJournal(journalToCreate);
        return {
            errors: [],
            status: 200,
            data: createdJournal
        };
    }
    // TODO Add Validation to Request
    // TODO Add Journal Role User Owner Or Admin Only
    async updateJournalById(request) {
        const { params, body } = request;
        const wasUpdated = await this.journalPersistenceService.updateJournalById(params.id, body);
        return {
            errors: [],
            status: 200,
            data: wasUpdated
        };
    }
    // TODO Add Validation to Request
    // TODO Add Journal Role Admin Access Only
    async deleteJournalById(request) {
        const { params } = request;
        const wasDeleted = await this.journalPersistenceService.deleteJournalById(params.id);
        return {
            errors: [],
            status: 200,
            data: wasDeleted
        };
    }
    // <---------Journal Entry-------------->
    // TODO Add Validation to Request
    // TODO Add User Owner Or Admin Only role authentication
    async getJournalEntryById(request) {
        const { params } = request;
        const journalEntry = await this.journalEntryPersistenceService.getJournalEntryById(params.id);
        return {
            errors: [],
            status: 200,
            data: journalEntry
        };
    }
    // TODO Add Validation to Request
    // TODO Add User Owner Or Admin Only role authentication
    async searchJournalEntry(request) {
        const { journalId, tags, title } = request.query;
        const searchRequest = {
            journalId: journalId,
            title: title,
        };
        const journalEntrys = await this.journalEntryPersistenceService.searchJournalEntries(searchRequest);
        return {
            errors: [],
            status: 200,
            data: journalEntrys
        };
    }
    // TODO Add Validation to Request
    // TODO Add User Owner Or Admin Only role authentication
    async createJournalEntry(request) {
        const { body: journalEntryToCreate } = request;
        const createdJournalEntry = await this.journalEntryPersistenceService.createJournalEntry(journalEntryToCreate);
        return {
            errors: [],
            status: 200,
            data: createdJournalEntry
        };
    }
    // TODO Add Validation to Request
    // TODO Add User Owner Or Admin Only role authentication
    async updateJournalEntryById(request) {
        const { params, body } = request;
        const wasUpdated = await this.journalEntryPersistenceService.updateJournalEntryById(params.id, body);
        return {
            errors: [],
            status: 200,
            data: wasUpdated
        };
    }
    // TODO Add Validation to Request
    // TODO Add User Owner Or Admin Only role authentication
    async deleteJournalEntryById(request) {
        const { params } = request;
        const wasDeleted = await this.journalEntryPersistenceService.deleteJournalEntryById(params.id);
        return {
            errors: [],
            status: 200,
            data: wasDeleted
        };
    }
}
exports.JournalHTTPController = JournalHTTPController;
