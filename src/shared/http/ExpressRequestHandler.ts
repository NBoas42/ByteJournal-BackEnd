import { Application,  Request, Response, NextFunction } from 'express';
import { ControllerOperation } from './types';


export async function expressRequestHandler(request: Request, response: Response, operation: ControllerOperation){
    try{
        const result = await operation(request);
        response
        .status(result.status)
        .send(result);
    } catch (error: any) {
        console.log(error);
        response
        .status(error.status || 500)
        .send({
            status: error.status || 500,
            error: [error.message],
            data: undefined,
        });
    }
}