import { Request } from "express";

import { JournalPersistenceService } from '../service/JournalPersitenceService';
import { HTTPResponse } from "../../shared/http/types";
import { SearchJournalRequest } from "../dto/SearchJournalRequest";


export class JournalHTTPController{

    journalPersistenceService: JournalPersistenceService;

    static get inject() {
        return ['JournalPersistenceService'];
    }

    constructor( journalPersistenceService: JournalPersistenceService){
        this.journalPersistenceService = journalPersistenceService;
    }

    // TODO Add Validation to Request
    // TODO Add Journal Role User Owner Or Admin Only
    async getJournalById(request: Request): Promise<HTTPResponse> {
        const { params } =  request;
        const journal = await this.journalPersistenceService.getJournalById(params.id);
        return {
            errors: [],
            status: 200,
            data: journal
        }
    }

    async createJournal (request: Request): Promise<HTTPResponse> {
        const { body: journalToCreate } = request;
        // TODO Add Journal Role User Owner Or Admin Only
        // TODO Add Validation to Request
        const createdJournal = await this.journalPersistenceService.createJournal(journalToCreate);
        return {
            errors: [],
            status: 200,
            data: createdJournal
        }
    }

    // TODO Add Validation to Request
    // TODO Add Journal Role User Owner Or Admin Only
    async updateJournalById (request: Request): Promise<HTTPResponse> {
        const { params, body } = request;
        const wasUpdated = await this.journalPersistenceService.updateJournalById(params.id, body);
        return {
            errors: [],
            status: 200,
            data: wasUpdated
        }
    }

    // TODO Add Validation to Request
    // TODO Add Journal Role Admin Access Only
    async deleteJournalById (request: Request): Promise<HTTPResponse> {
        const { params } =  request;
        const wasDeleted = await this.journalPersistenceService.deleteJournalById(params.id);
        return {
            errors: [],
            status: 200,
            data: wasDeleted
        }
    }

    async searchJournal (request: Request): Promise<HTTPResponse> {
        const { accountId } =  request.query;
        const searchRequest: SearchJournalRequest = {
            accountId: accountId as string,
        }
        const journals = await this.journalPersistenceService.searchJournals(searchRequest);
        return {
            errors: [],
            status: 200,
            data: journals
        }
    }

}