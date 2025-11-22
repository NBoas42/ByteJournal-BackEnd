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
exports.ScratchPadEntity = void 0;
const typeorm_1 = require("typeorm");
const JournalEntity_1 = require("./JournalEntity");
let ScratchPadEntity = class ScratchPadEntity {
};
exports.ScratchPadEntity = ScratchPadEntity;
__decorate([
    (0, typeorm_1.Column)("uuid", {
        primary: true,
        name: "id",
        default: () => "gen_random_uuid()",
    }),
    __metadata("design:type", String)
], ScratchPadEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid", { name: "journal_id" }),
    __metadata("design:type", String)
], ScratchPadEntity.prototype, "journalId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "title" }),
    __metadata("design:type", String)
], ScratchPadEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "content", nullable: true }),
    __metadata("design:type", Object)
], ScratchPadEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], ScratchPadEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "updated_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], ScratchPadEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => JournalEntity_1.JournalEntity, (journal) => journal.scratchPads, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "journal_id", referencedColumnName: "id" }]),
    __metadata("design:type", JournalEntity_1.JournalEntity)
], ScratchPadEntity.prototype, "journal", void 0);
exports.ScratchPadEntity = ScratchPadEntity = __decorate([
    (0, typeorm_1.Index)("scratch_pad_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Index)("idx_sp_journal", ["journalId"], {}),
    (0, typeorm_1.Entity)("scratch_pad", { schema: "public" })
], ScratchPadEntity);
