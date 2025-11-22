"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalEntity = void 0;
const typeorm_1 = require("typeorm");
const AccountEntity_1 = require("../../account/entity/AccountEntity");
const JournalEntryEntity_1 = require("./JournalEntryEntity");
const ScratchPadEntity_1 = require("./ScratchPadEntity");
let JournalEntity = class JournalEntity {
};
exports.JournalEntity = JournalEntity;
__decorate([
    (0, typeorm_1.Column)("uuid", {
        primary: true,
        name: "id",
        default: () => "gen_random_uuid()",
    }),
    __metadata("design:type", String)
], JournalEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid", { name: "account_id" }),
    __metadata("design:type", String)
], JournalEntity.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "title" }),
    __metadata("design:type", String)
], JournalEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "description", nullable: true }),
    __metadata("design:type", Object)
], JournalEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], JournalEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "updated_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], JournalEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AccountEntity_1.AccountEntity, (account) => account.journals, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "account_id", referencedColumnName: "id" }]),
    __metadata("design:type", AccountEntity_1.AccountEntity)
], JournalEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JournalEntryEntity_1.JournalEntryEntity, (journalEntry) => journalEntry.journal),
    __metadata("design:type", Array)
], JournalEntity.prototype, "journalEntries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ScratchPadEntity_1.ScratchPadEntity, (scratchPad) => scratchPad.journal),
    __metadata("design:type", Array)
], JournalEntity.prototype, "scratchPads", void 0);
exports.JournalEntity = JournalEntity = __decorate([
    (0, typeorm_1.Index)("idx_journal_account", ["accountId"], {}),
    (0, typeorm_1.Index)("journal_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Entity)("journal", { schema: "public" })
], JournalEntity);
