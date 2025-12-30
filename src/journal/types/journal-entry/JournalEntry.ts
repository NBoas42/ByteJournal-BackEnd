export interface JournalEntry {
      id: string;
      title: string;
      journalId: string;
      tags?: string[];
      createdAt: Date;
      updatedAt: Date;
}

export interface JournalEntryWithRelations {
     
}