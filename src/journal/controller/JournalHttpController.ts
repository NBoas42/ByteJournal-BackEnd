import { Request } from "express";

import { HTTPResponse } from "../../shared/types/HttpResponse";

import { SearchJournalRequest } from "../types/journal/SearchJournalRequest";
import { SearchJournalEntryRequest } from "../types/journal-entry/SearchJournalEntryRequest";

import { JournalPersistenceService } from '../service/JournalPersitenceService';
import { JournalEntryPersistenceService } from "../service/JournalEntryPersitenceService";
import { CreateJournalEntryRequest } from "../types/journal-entry/CreateJournalEntryRequest";
import { CreateJournalRequest } from "../types/journal/CreateJournalRequest";
import { UpdateJournalEntryRequest } from "../types/journal-entry/UpdateJournalEntryRequest";
import { UpdateJournalRequest } from "../types/journal/UpdateJournalRequest";

export class JournalHTTPController {

    journalPersistenceService: JournalPersistenceService;
    journalEntryPersistenceService: JournalEntryPersistenceService

    static get inject() {
        return [
            'JournalPersistenceService',
            'JournalEntryPersistenceService'
        ];
    }

    constructor( 
        journalPersistenceService: JournalPersistenceService,
        journalEntryPersistenceService: JournalEntryPersistenceService
    ){
        this.journalPersistenceService = journalPersistenceService;
        this.journalEntryPersistenceService = journalEntryPersistenceService;
    }

    // <---------Journal-------------->
    async searchJournal (request: Request): Promise<HTTPResponse> {
        const requestingAccount = request.requestingAccount;
        const searchJournalRequest: SearchJournalRequest =  request.query;// TODO Validate With Zod Safe Parse
        const journals = await this.journalPersistenceService.searchJournals(searchJournalRequest, requestingAccount);
        return {
            errors: [],
            status: 200,
            data: journals
        }
    }

    async getJournalById(request: Request): Promise<HTTPResponse> {
        const id = request.params.id;
        const requestingAccount  = request.requestingAccount;
        const journal = await this.journalPersistenceService.getJournalById(id, requestingAccount);
        return {
            errors: [],
            status: 200,
            data: journal
        }
    }

    async createJournal (request: Request): Promise<HTTPResponse> {
        const journalToCreate: CreateJournalRequest = request.body;// TODO Validate With Zod Safe Parse
        const createdJournal = await this.journalPersistenceService.createJournal(journalToCreate);
        return {
            errors: [],
            status: 200,
            data: createdJournal
        }
    }

    async updateJournalById (request: Request): Promise<HTTPResponse> {
        const params = request.params;
        const requestingAccount  = request.requestingAccount;
        const body: UpdateJournalRequest = request.body;// TODO Validate With Zod Safe Parse
        const wasUpdated = await this.journalPersistenceService.updateJournalById(params.id, body, requestingAccount);
        return {
            errors: [],
            status: 200,
            data: wasUpdated
        }
    }

    async deleteJournalById (request: Request): Promise<HTTPResponse> {
        const params = request.params;
        const requestingAccount  = request.requestingAccount;
        const wasDeleted = await this.journalPersistenceService.deleteJournalById(params.id, requestingAccount);
        return {
            errors: [],
            status: 200,
            data: wasDeleted
        }
    }

    // <---------Journal Entry-------------->
    async getJournalEntryById(request: Request): Promise<HTTPResponse> {
        const params = request.params;
        const requestingAccount = request.requestingAccount;
        const journalEntry = await this.journalEntryPersistenceService.getJournalEntryById(params.id, requestingAccount);
        return {
            errors: [],
            status: 200,
            data: journalEntry
        }
    }

    async searchJournalEntry(request: Request): Promise<HTTPResponse> {
        const requestingAccount = request.requestingAccount;
        const searchJournalEntryRequest: SearchJournalEntryRequest = request.query// TODO Validate With Safe Parse Zod
        const journalEntrys = await this.journalEntryPersistenceService.searchJournalEntries(searchJournalEntryRequest, requestingAccount);
        return {
            errors: [],
            status: 200,
            data: journalEntrys
        }
    }

    async createJournalEntry (request: Request): Promise<HTTPResponse> {
        const journalEntryToCreate: CreateJournalEntryRequest = request.body;// TODO Validate With Safe Parse Zod
        const createdJournalEntry = await this.journalEntryPersistenceService.createJournalEntry(journalEntryToCreate);
        return {
            errors: [],
            status: 200,
            data: createdJournalEntry
        }
    }

    async updateJournalEntryById (request: Request): Promise<HTTPResponse> {
        const requestingAccount = request.requestingAccount;        
        const journalEntryId = request?.params?.journalEntryId;
        const journalEntryToUpdate: UpdateJournalEntryRequest = request?.body;// TODO Validate With Safe Parse Zod
        const wasUpdated = await this.journalEntryPersistenceService.updateJournalEntryById(journalEntryId, journalEntryToUpdate, requestingAccount);
        return {
            errors: [],
            status: 200,
            data: wasUpdated
        }
    }

    async deleteJournalEntryById (request: Request): Promise<HTTPResponse> {
        const params = request.params;
        const requestingAccount = request.requestingAccount;        
        const wasDeleted = await this.journalEntryPersistenceService.deleteJournalEntryById(params.journalEntryId, requestingAccount);
        return {
            errors: [],
            status: 200,
            data: wasDeleted
        }
    }
    

}

