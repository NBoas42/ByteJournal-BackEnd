import { PermissionType } from "../../shared/types/PermissionType";

export interface Account {
    id: string;
    name: string;
    permissionType: PermissionType;
    email: string;
    password: string;
    picture: string;
    createdAt:Date;
    updatedAt:Date;
}