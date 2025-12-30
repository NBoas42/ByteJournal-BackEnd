export interface CreateJournalEntryRequest {
    accountId:string;
    journalId:string;
    title:string;
    tags?:string[];
}