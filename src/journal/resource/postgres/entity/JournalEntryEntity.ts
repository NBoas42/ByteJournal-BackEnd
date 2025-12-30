import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { JournalEntity } from "./JournalEntity";
import { NoteEntity  } from "./NoteEntity";
import { ReviewEntity  } from "./ReviewEntity";
import { TaskEntity  } from "./TaskEntity";

@Index("journal_entry_pkey", ["id"], { unique: true })
@Index("idx_entry_journal", ["journalId"], {})
@Entity("journal_entry", { schema: "public" })
export class JournalEntryEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id?: string;

  @Column("uuid", { name: "journal_id" })
  journalId!: string;

  @Column("varchar", { name: "title" })
  title!: string;

  @Column("varchar", {
    name: "tags",
    array: true,
    nullable: false,
    default: () => "'{}'", // empty PG array literal
  })
  tags!: string[];

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

  @ManyToOne(() => JournalEntity, (journal) => journal.journalEntries, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "journal_id", referencedColumnName: "id" }])
  journal?: JournalEntity;

  @OneToMany(() => NoteEntity, (note) => note.journalEntry)
  notes?: NoteEntity[];

  @OneToOne(() => ReviewEntity, (review) => review.journalEntry)
  review?: ReviewEntity;

  @OneToMany(() => TaskEntity, (task) => task.journalEntry)
  tasks?: TaskEntity[];
}
