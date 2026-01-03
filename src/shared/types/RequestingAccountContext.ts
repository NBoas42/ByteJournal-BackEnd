import { PermissionType } from "./PermissionType";

export interface RequestingAccountContext {
    id: string,
    permissionType: PermissionType,
}