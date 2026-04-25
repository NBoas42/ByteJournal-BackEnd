import { Request } from "express";

import { HTTPResponse } from "../../../shared/types/HttpResponse";

import {
    SearchJournalRequestSchema,
} from "../types/journal/SearchJournalRequest";

import {
    SearchJournalEntryRequestSchema,
} from "../types/journal-entry/SearchJournalEntryRequest";

import {
    CreateJournalEntryRequestSchema,
} from "../types/journal-entry/CreateJournalEntryRequest";

import {
    CreateJournalRequestSchema,
} from "../types/journal/CreateJournalRequest";

import {
    UpdateJournalEntryRequestWithRelationsSchema,
} from "../types/journal-entry/UpdateJournalEntryRequest";

import {
    UpdateJournalRequestSchema} from "../types/journal/UpdateJournalRequest";

import { JournalPersistenceService } from "../service/JournalPersitenceService";
import { JournalEntryPersistenceService } from "../service/JournalEntryPersitenceService";

export class JournalHTTPController {
    journalPersistenceService: JournalPersistenceService;
    journalEntryPersistenceService: JournalEntryPersistenceService;

    static get inject() {
        return ["JournalPersistenceService", "JournalEntryPersistenceService"];
    }

    constructor(
        journalPersistenceService: JournalPersistenceService,
        journalEntryPersistenceService: JournalEntryPersistenceService
    ) {
        this.journalPersistenceService = journalPersistenceService;
        this.journalEntryPersistenceService = journalEntryPersistenceService;
    }

    // <---------Journal-------------->
    async searchJournal(request: Request): Promise<HTTPResponse> {
        const requestingAccount = request.requestingAccount;

        const searchJournalRequest = SearchJournalRequestSchema.safeParse(
            request.query
        );

        if (searchJournalRequest.success === false) {
            throw new Error("INVALID_REQUEST");
        }

        return {
            errors: [],
            status: 200,
            data: await this.journalPersistenceService.searchJournals(
                searchJournalRequest.data,
                requestingAccount
            ),
        };
    }

    async getJournalById(request: Request): Promise<HTTPResponse> {
        const id = request.params.id;
        const requestingAccount = request.requestingAccount;
        return {
            errors: [],
            status: 200,
            data: await this.journalPersistenceService.getJournalById(
                id,
                requestingAccount
            ),
        };
    }

    async createJournal(request: Request): Promise<HTTPResponse> {
        const createJournalRequest = CreateJournalRequestSchema.safeParse(request.body);

        if (createJournalRequest.success === false) {
            throw new Error("INVALID_REQUEST");
        }

        return {
            errors: [],
            status: 200,
            data: await this.journalPersistenceService.createJournal(createJournalRequest.data)
        };
    }

    async updateJournalById(request: Request): Promise<HTTPResponse> {
        const params = request.params;
        const requestingAccount = request.requestingAccount;
        const updateJournalRequest = UpdateJournalRequestSchema.safeParse(
            request.body
        );

        if (updateJournalRequest.success === false) {
            throw new Error("INVALID_REQUEST");
        }

        return {
            errors: [],
            status: 200,
            data: await this.journalPersistenceService.updateJournalById(
                params.id,
                updateJournalRequest.data,
                requestingAccount
            ),
        };
    }

    async deleteJournalById(request: Request): Promise<HTTPResponse> {
        const params = request.params;
        const requestingAccount = request.requestingAccount;
        return {
            errors: [],
            status: 200,
            data: await this.journalPersistenceService.deleteJournalById(
                params.id,
                requestingAccount
            ),
        };
    }

    // <---------Journal Entry-------------->
    async getJournalEntryByIdWithRelations(request: Request): Promise<HTTPResponse> {
        const params = request.params;
        const requestingAccount = request.requestingAccount;
        return {
            errors: [],
            status: 200,
            data: await this.journalEntryPersistenceService.getJournalEntryByIdWithRelations(
                params.journalEntryId,
                requestingAccount
            ),
        };
    }

    async searchJournalEntriesWithRelations(request: Request): Promise<HTTPResponse> {
        const requestingAccount = request.requestingAccount;
        const searchJournalEntryRequest = SearchJournalEntryRequestSchema.safeParse(
            request.body
        );

        if (searchJournalEntryRequest.success === false) {
            throw new Error("INVALID_REQUEST");
        }

        return {
            errors: [],
            status: 200,
            data: await this.journalEntryPersistenceService.searchJournalEntriesWithRelations(
                request.params.journalId,
                searchJournalEntryRequest.data,
                requestingAccount
            ),
        };
    }

    async createJournalEntry(request: Request): Promise<HTTPResponse> {
        const createJournalEntryRequest = CreateJournalEntryRequestSchema.safeParse(
            request.body
        );

        if (createJournalEntryRequest.success === false) {
            throw new Error("INVALID_REQUEST");
        }

        return {
            errors: [],
            status: 200,
            data: await this.journalEntryPersistenceService.createJournalEntry(
                createJournalEntryRequest.data
            ),
        };
    }

    async updateJournalEntryByIdWithRelations(request: Request): Promise<HTTPResponse> {
        const requestingAccount = request.requestingAccount;
        const journalEntryId = request.params.journalEntryId;
        const updateJournalEntryRequest = UpdateJournalEntryRequestWithRelationsSchema.safeParse(request.body);

        if (updateJournalEntryRequest.success === false) {
            throw new Error("INVALID_REQUEST");
        }

        return {
            errors: [],
            status: 200,
            data:  await this.journalEntryPersistenceService.updateJournalEntryByIdWithRelations(
                journalEntryId,
                updateJournalEntryRequest.data,
                requestingAccount
            ),
        };
    }

    async deleteJournalEntryById(request: Request): Promise<HTTPResponse> {
        const params = request.params;
        const requestingAccount = request.requestingAccount;

        return {
            errors: [],
            status: 200,
            data: await this.journalEntryPersistenceService.deleteJournalEntryById(
                params.journalEntryId,
                requestingAccount
            ),
        };
    }
}
