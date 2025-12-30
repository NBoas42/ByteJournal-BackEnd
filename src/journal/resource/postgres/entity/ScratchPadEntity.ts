import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { JournalEntity } from "./JournalEntity";

@Index("scratch_pad_pkey", ["id"], { unique: true })
@Index("idx_sp_journal", ["journalId"], {})
@Entity("scratch_pad", { schema: "public" })
export class ScratchPadEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id?: string;

  @Column("uuid", { name: "journal_id" })
  journalId!: string;

  @Column("character varying", { name: "title" })
  title!: string;

  @Column("text", { name: "content", nullable: true })
  content?: string | null;

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

  @ManyToOne(() => JournalEntity, (journal) => journal.scratchPads, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "journal_id", referencedColumnName: "id" }])
  journal?: JournalEntity;
}
