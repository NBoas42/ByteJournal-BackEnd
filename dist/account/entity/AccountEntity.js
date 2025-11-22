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
exports.AccountEntity = void 0;
const typeorm_1 = require("typeorm");
const JournalEntity_1 = require("../../journal/entity/JournalEntity");
let AccountEntity = class AccountEntity {
};
exports.AccountEntity = AccountEntity;
__decorate([
    (0, typeorm_1.Column)("uuid", {
        primary: true,
        name: "id",
        default: () => "gen_random_uuid()",
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "name" }),
    __metadata("design:type", String)
], AccountEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "email", unique: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "password" }),
    __metadata("design:type", String)
], AccountEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { name: "permission_type", enum: ["ADMIN", "USER"] }),
    __metadata("design:type", String)
], AccountEntity.prototype, "permissionType", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "picture", nullable: true }),
    __metadata("design:type", Object)
], AccountEntity.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], AccountEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "updated_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], AccountEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JournalEntity_1.JournalEntity, (journal) => journal.account),
    __metadata("design:type", Array)
], AccountEntity.prototype, "journals", void 0);
exports.AccountEntity = AccountEntity = __decorate([
    (0, typeorm_1.Index)("account_email_key", ["email"], { unique: true }),
    (0, typeorm_1.Index)("account_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Entity)("account", { schema: "public" })
], AccountEntity);
