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
exports.TaskEntity = void 0;
const typeorm_1 = require("typeorm");
const JournalEntryEntity_1 = require("./JournalEntryEntity");
let TaskEntity = class TaskEntity {
};
exports.TaskEntity = TaskEntity;
__decorate([
    (0, typeorm_1.Column)("uuid", {
        primary: true,
        name: "id",
        default: () => "gen_random_uuid()",
    }),
    __metadata("design:type", String)
], TaskEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid", { name: "journal_entry_id" }),
    __metadata("design:type", String)
], TaskEntity.prototype, "journalEntryId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "title" }),
    __metadata("design:type", String)
], TaskEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "description", nullable: true }),
    __metadata("design:type", Object)
], TaskEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "status",
        enum: ["NOT_STARTED", "STARTED", "COMPLETED"], // TO DO Add Typing Here
    }),
    __metadata("design:type", String)
], TaskEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], TaskEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "updated_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], TaskEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "finished_at",
        nullable: true,
    }),
    __metadata("design:type", Object)
], TaskEntity.prototype, "finishedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => JournalEntryEntity_1.JournalEntryEntity, (journalEntry) => journalEntry.tasks, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "journal_entry_id", referencedColumnName: "id" }]),
    __metadata("design:type", JournalEntryEntity_1.JournalEntryEntity)
], TaskEntity.prototype, "journalEntry", void 0);
exports.TaskEntity = TaskEntity = __decorate([
    (0, typeorm_1.Index)("task_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Index)("idx_task_entry", ["journalEntryId"], {}),
    (0, typeorm_1.Entity)("task", { schema: "public" })
], TaskEntity);
