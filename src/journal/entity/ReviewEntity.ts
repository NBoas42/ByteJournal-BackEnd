import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { JournalEntryEntity } from "./JournalEntryEntity";

@Index("review_pkey", ["id"], { unique: true })
@Index("review_journal_entry_id_key", ["journalEntryId"], { unique: true })
@Entity("review", { schema: "public" })
export class ReviewEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id?: string;

  @Column("uuid", { name: "journal_entry_id", unique: true })
  journalEntryId!: string;

  @Column("text", { name: "content" })
  content!: string;

  @Column("integer", { name: "rating", nullable: true })
  rating!: number | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  @OneToOne(() => JournalEntryEntity, (journalEntry) => journalEntry.review, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "journal_entry_id", referencedColumnName: "id" }])
  journalEntry?: JournalEntryEntity;
}
