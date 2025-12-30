import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { JournalEntryEntity } from "./JournalEntryEntity";

@Index("task_pkey", ["id"], { unique: true })
@Index("idx_task_entry", ["journalEntryId"], {})
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

  @Column("character varying", { name: "title" })
  title!: string;

  @Column("text", { name: "description", nullable: true })
  description!: string | null;

  @Column("enum", {
    name: "status",
    enum: ["NOT_STARTED", "STARTED", "COMPLETED"], // TO DO Add Typing Here
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
  @JoinColumn([{ name: "journal_entry_id", referencedColumnName: "id" }])
  journalEntry!: JournalEntryEntity;
}
