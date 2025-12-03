import { Request } from "express";

import { JournalPersistenceService } from '../service/JournalPersitenceService';
import { HTTPResponse } from "../../shared/http/types";


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

    // TODO Add Validation to Request
    // TODO Add Journal Role User Owner Or Admin Only
    // TODO Return Created Journal
    async createJournal (request: Request): Promise<HTTPResponse> {
        const { body } = request;// TODO Probably a better way to deal with this
        const wasCreated = await this.journalPersistenceService.createJournal(body);
        return {
            errors: [],
            status: 200,
            data: wasCreated
        }
    }

    // TODO Add Validation to Request
    // TODO Add Journal Role User Owner Or Admin Only
    async updateJournalById (request: Request): Promise<HTTPResponse> {
        const { params, body } = request;// TODO Probably a better way to deal with this
        const updatedJournal = await this.journalPersistenceService.updateJournalById(params.id, body);
        return {
            errors: [],
            status: 200,
            data: updatedJournal
        }
    }

    // TODO Add Validation to Request
    // TODO Add Journal Role Admin Access Only
    // TODO Add soft delete
    async deleteJournalById (request: Request): Promise<HTTPResponse> {
        const { params } =  request;
        const wasDeleted = await this.journalPersistenceService.deleteJournalById(params.id);
        
        return {
            errors: [],
            status: 200,
            data: wasDeleted
        }
    }

}