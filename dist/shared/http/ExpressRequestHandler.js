"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressRequestHandler = expressRequestHandler;
async function expressRequestHandler(request, response, operation) {
    try {
        const result = await operation(request);
        response
            .status(result.status)
            .send(result);
    }
    catch (error) {
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
