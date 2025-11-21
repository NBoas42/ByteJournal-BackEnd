import { Request } from 'express';

export type ControllerOperation = (req: Request) => Promise<HTTPResponse>;
export interface HTTPResponse {
    errors: [],
    status: number,
    data: any
}