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
exports.JournalEntryEntity = void 0;
const typeorm_1 = require("typeorm");
const JournalEntity_1 = require("./JournalEntity");
const NoteEntity_1 = require("./NoteEntity");
const ReviewEntity_1 = require("./ReviewEntity");
const TaskEntity_1 = require("./TaskEntity");
let JournalEntryEntity = class JournalEntryEntity {
};
exports.JournalEntryEntity = JournalEntryEntity;
__decorate([
    (0, typeorm_1.Column)("uuid", {
        primary: true,
        name: "id",
        default: () => "gen_random_uuid()",
    }),
    __metadata("design:type", String)
], JournalEntryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid", { name: "journal_id" }),
    __metadata("design:type", String)
], JournalEntryEntity.prototype, "journalId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "tag", nullable: true }),
    __metadata("design:type", Object)
], JournalEntryEntity.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], JournalEntryEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "updated_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], JournalEntryEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => JournalEntity_1.JournalEntity, (journal) => journal.journalEntries, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "journal_id", referencedColumnName: "id" }]),
    __metadata("design:type", JournalEntity_1.JournalEntity)
], JournalEntryEntity.prototype, "journal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => NoteEntity_1.NoteEntity, (note) => note.journalEntry),
    __metadata("design:type", Array)
], JournalEntryEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ReviewEntity_1.ReviewEntity, (review) => review.journalEntry),
    __metadata("design:type", ReviewEntity_1.ReviewEntity)
], JournalEntryEntity.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TaskEntity_1.TaskEntity, (task) => task.journalEntry),
    __metadata("design:type", Array)
], JournalEntryEntity.prototype, "tasks", void 0);
exports.JournalEntryEntity = JournalEntryEntity = __decorate([
    (0, typeorm_1.Index)("journal_entry_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Index)("idx_entry_journal", ["journalId"], {}),
    (0, typeorm_1.Entity)("journal_entry", { schema: "public" })
], JournalEntryEntity);
