import { Request } from "express";

import { HTTPResponse } from "../../shared/http/types";

import { SearchJournalRequest } from "../types/journal/SearchJournalRequest";
import { SearchJournalEntryRequest } from "../types/journal-entry/SearchJournalEntryRequest";

import { JournalPersistenceService } from '../service/JournalPersitenceService';
import { JournalEntryPersistenceService } from "../service/JournalEntryPersitenceService";
import { CreateJournalEntryRequest } from "../types/journal-entry/CreateJournalEntryRequest";
import { CreateJournalRequest } from "../types/journal/CreateJournalRequest";
import { UpdateJournalEntryRequest } from "../types/journal-entry/UpdateJournalEntryRequest";
import { HTTPController } from "../../shared/controller/HttpController";


export class JournalHTTPController extends HTTPController{

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
        super();
        this.journalPersistenceService = journalPersistenceService;
        this.journalEntryPersistenceService = journalEntryPersistenceService;
    }

    // <---------Journal-------------->
    // TODO Add Validation to Request
    async searchJournal (request: Request): Promise<HTTPResponse> {
        const { accountId } =  this.parseQueryObject(request.query);
        const { requestingAccount } = request.body;
        const journals = await this.journalPersistenceService.searchJournals({ accountId });
        return {
            errors: [],
            status: 200,
            data: journals
        }
    }

    // TODO Add Validation to Request
    async getJournalById(request: Request): Promise<HTTPResponse> {
        const { id } =  request.params;
        const { requestingAccount } = request.body;
        const journal = await this.journalPersistenceService.getJournalById(id);
        return {
            errors: [],
            status: 200,
            data: journal
        }
    }

    // TODO Add Validation to Request
    // TODO Add Request Creation Here
    async createJournal (request: Request): Promise<HTTPResponse> {
        const { requestingAccount } = request.body;
        const journalToCreate = request.body as CreateJournalRequest;
        const createdJournal = await this.journalPersistenceService.createJournal(journalToCreate);
        return {
            errors: [],
            status: 200,
            data: createdJournal
        }
    }

    // TODO Add Validation to Request
    async updateJournalById (request: Request): Promise<HTTPResponse> {
        const { params, body } = request;
        const { requestingAccount } = request.body; // How to best deal with this?
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
        const { requestingAccount } = request.body;
        const wasDeleted = await this.journalPersistenceService.deleteJournalById(params.id);
        return {
            errors: [],
            status: 200,
            data: wasDeleted
        }
    }

    // <---------Journal Entry-------------->
    // TODO Add Validation to Request
    // TODO Add User Owner Or Admin Only role authentication
    async getJournalEntryById(request: Request): Promise<HTTPResponse> {
        const { params } =  request;
        const { requestingAccount } = request.body;
        const journalEntry = await this.journalEntryPersistenceService.getJournalEntryById(params.id);
        return {
            errors: [],
            status: 200,
            data: journalEntry
        }
    }

    // TODO Add Validation to Request
    // TODO Add User Owner Or Admin Only role authentication
    async searchJournalEntry(request: Request): Promise<HTTPResponse> {
        const { journalId, tags, title } =  request.query;
        const { requestingAccount } = request.body;
        const searchRequest: SearchJournalEntryRequest = {
            journalId: journalId as string,
            title: title as string,
        }
        const journalEntrys = await this.journalEntryPersistenceService.searchJournalEntries(searchRequest);
        return {
            errors: [],
            status: 200,
            data: journalEntrys
        }
    }

    // TODO Add Validation to Request
    // TODO Add User Owner Or Admin Only role authentication
    async createJournalEntry (request: Request): Promise<HTTPResponse> {
        const { body, params } = request;
        const journalEntryToCreate: CreateJournalEntryRequest = {
            journalId: params.journalId,
            title: body.title,
            tags: body.tags,
        };
        const createdJournalEntry = await this.journalEntryPersistenceService.createJournalEntry(journalEntryToCreate);
        return {
            errors: [],
            status: 200,
            data: createdJournalEntry
        }
    }

    // TODO Add Validation to Request
    async updateJournalEntryById (request: Request): Promise<HTTPResponse> {
        const { requestingAccount } = request?.body;
        const journalEntryId = request?.params?.journalEntryId;
        const journalEntryToUpdate = request?.body as UpdateJournalEntryRequest;
        const wasUpdated = await this.journalEntryPersistenceService.updateJournalEntryById(journalEntryId, journalEntryToUpdate);
        return {
            errors: [],
            status: 200,
            data: wasUpdated
        }
    }

    // TODO Add Validation to Request
    async deleteJournalEntryById (request: Request): Promise<HTTPResponse> {
        const { params } =  request;
        const wasDeleted = await this.journalEntryPersistenceService.deleteJournalEntryById(params.journalEntryId);
        return {
            errors: [],
            status: 200,
            data: wasDeleted
        }
    }
    

}