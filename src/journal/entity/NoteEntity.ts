import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { JournalEntryEntity } from "./JournalEntryEntity";

@Index("note_pkey", ["id"], { unique: true })
@Index("idx_note_entry", ["journalEntryId"], {})
@Entity("note", { schema: "public" })
export class NoteEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id?: string;

  @Column("uuid", { name: "journal_entry_id" })
  journalEntryId!: string;

  @Column("text", { name: "content" })
  content!: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt?: Date;

  @ManyToOne(() => JournalEntryEntity, (journalEntry) => journalEntry.notes, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "journal_entry_id", referencedColumnName: "id" }])
  journalEntry?: JournalEntryEntity;
}
