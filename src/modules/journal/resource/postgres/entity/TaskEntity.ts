import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { JournalEntryEntity } from "./JournalEntryEntity";

@Index("task_pkey", ["id"], { unique: true })
@Index("idx_task_entry", ["journalEntryId"], {})
@Index("idx_task_account", ["accountId"], {})
@Index("idx_task_account_entry", ["accountId", "journalEntryId"], {})
@Entity("task", { schema: "public" })
export class TaskEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id?: string;

  @Column("uuid", { name: "journal_entry_id" })
  journalEntryId!: string;

  @Column("uuid", { name: "account_id" })
  accountId!: string;

  @Column("character varying", { name: "title" })
  title!: string;

  // nullable: true => should be optional in TS too
  @Column("text", { name: "description", nullable: true })
  description?: string | null;

  @Column("enum", {
    name: "status",
    enum: ["NOT_STARTED", "STARTED", "COMPLETED"],
  })
  status!: "NOT_STARTED" | "STARTED" | "COMPLETED";

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

  @Column("timestamp without time zone", {
    name: "finished_at",
    nullable: true,
  })
  finishedAt?: Date | null;

  @ManyToOne(() => JournalEntryEntity, (journalEntry) => journalEntry.tasks, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "journal_entry_id", referencedColumnName: "id" },
    { name: "account_id", referencedColumnName: "accountId" }, 
  ])
  journalEntry!: JournalEntryEntity;
}
