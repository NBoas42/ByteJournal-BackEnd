import { Role } from "../../shared/types/Role";

export interface Account {
    id: string;
    name: string;
    email: string;
    password: string;
    picture: string;
    createdAt:Date;
    updatedAt:Date;
}