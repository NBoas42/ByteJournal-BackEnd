export interface Journal {
      id: string;
      accountId: string;
      title: string;
      description: string | null;
      createdAt: Date;
      updatedAt: Date;
}