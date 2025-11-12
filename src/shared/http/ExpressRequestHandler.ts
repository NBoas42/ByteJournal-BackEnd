import { Application,  Request, Response, NextFunction } from 'express';

export async function expressRequestHandler(request: Request, response: Response, operation: Function){
    try{
        const result = await operation(request);
        response.status(200).send({status:200, data:'Hello World'})
    } catch (error: any) { // TO DO Add Typing Here
        response.status(200).send({message:error.message, stack: error.stack});
    }
}