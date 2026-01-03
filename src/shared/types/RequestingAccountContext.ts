import { Role } from "./Role";

export interface RequestingAccountContext {
    id: string,
    role: Role,
}