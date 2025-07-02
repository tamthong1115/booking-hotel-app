export default class CustomError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly isOperational = true;

    constructor(message: string, code = "ERROR", statusCode = 500) {
        super(message);
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
        // make sure the new object get the Error prototype
        Object.setPrototypeOf(this, new.target.prototype);
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        Error.captureStackTrace(this);
    }
}
