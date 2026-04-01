export class ApiError extends Error {

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
    }
    public statusCode: number;
        
}