import { Request } from 'express';
import { HTTPResponse } from './HttpResponse';

export type ControllerOperation = (req: Request) => Promise<HTTPResponse>;