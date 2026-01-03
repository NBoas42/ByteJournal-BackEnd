import { Column, Entity, Index, OneToMany } from "typeorm";
import { JournalEntity } from "../../../journal/resource/postgres/entity/JournalEntity";
import { PERMISSIONS_TYPES, PermissionType } from "../../../shared/types/PermissionType";

@Index("account_email_key", ["email"], { unique: true })
@Index("account_pkey", ["id"], { unique: true })
@Entity("account", { schema: "public" })
export class AccountEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id?: string;

  @Column("character varying", { name: "name" })
  name!: string;

  @Column("character varying", { name: "email", unique: true })
  email!: string;

  @Column("character varying", { name: "password" })
  password!: string;

  @Column("enum", { name: "permission_type", enum: PERMISSIONS_TYPES})
  permissionType!: PermissionType;

  @Column("character varying", { name: "picture", nullable: true })
  picture?: string | null;

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

  @OneToMany(() => JournalEntity, (journal) => journal.account)
  journals?: JournalEntity[];
}
