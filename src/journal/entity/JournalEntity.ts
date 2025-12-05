import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AccountEntity } from "../../account/entity/AccountEntity";
import { JournalEntryEntity } from "./JournalEntryEntity";
import { ScratchPadEntity } from "./ScratchPadEntity";

@Index("idx_journal_account", ["accountId"], {})
@Index("journal_pkey", ["id"], { unique: true })
@Entity("journal", { schema: "public" })
export class JournalEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id?: string;

  @Column("uuid", { name: "account_id" })
  accountId!: string;

  @Column("character varying", { name: "title" })
  title!: string;

  @Column("character varying", { name: "description", nullable: true })
  description?: string | null;

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

  @ManyToOne(() => AccountEntity, (account) => account.journals, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account?: AccountEntity;

  @OneToMany(() => JournalEntryEntity, (journalEntry) => journalEntry.journal)
  journalEntries!: JournalEntryEntity[];

  @OneToMany(() => ScratchPadEntity, (scratchPad) => scratchPad.journal)
  scratchPads?: ScratchPadEntity[];
}
