export interface CreateJournalEntryRequest {
    journalId:string;
    title:string;
    tags?:string[];
}