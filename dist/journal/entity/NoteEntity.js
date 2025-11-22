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
exports.NoteEntity = void 0;
const typeorm_1 = require("typeorm");
const JournalEntryEntity_1 = require("./JournalEntryEntity");
let NoteEntity = class NoteEntity {
};
exports.NoteEntity = NoteEntity;
__decorate([
    (0, typeorm_1.Column)("uuid", {
        primary: true,
        name: "id",
        default: () => "gen_random_uuid()",
    }),
    __metadata("design:type", String)
], NoteEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid", { name: "journal_entry_id" }),
    __metadata("design:type", String)
], NoteEntity.prototype, "journalEntryId", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "content" }),
    __metadata("design:type", String)
], NoteEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], NoteEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "updated_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], NoteEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => JournalEntryEntity_1.JournalEntryEntity, (journalEntry) => journalEntry.notes, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "journal_entry_id", referencedColumnName: "id" }]),
    __metadata("design:type", JournalEntryEntity_1.JournalEntryEntity)
], NoteEntity.prototype, "journalEntry", void 0);
exports.NoteEntity = NoteEntity = __decorate([
    (0, typeorm_1.Index)("note_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Index)("idx_note_entry", ["journalEntryId"], {}),
    (0, typeorm_1.Entity)("note", { schema: "public" })
], NoteEntity);
