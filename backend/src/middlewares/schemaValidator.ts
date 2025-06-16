import _ from "lodash";
import { ObjectSchema } from "joi";

import { NextFunction, Request, Response } from "express";

const supportedMethods = ["post", "put"];
const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
};

const schemaValidator = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const method = req.method.toLowerCase();

    if (!_.includes(supportedMethods, method)) {
        return next();
    }

    const { error, value } = schema.validate(req.body, validationOptions);
    if (error) {
        const joiError = {
            status: "failed",
            error: {
                details: error.details.map(({ message, type }) => ({
                    // Remove quotes from the error message
                    message: message.replace(/['"]/g, ""),
                    // message: message,
                    type,
                })),
            },
        };
        return res.status(400).json(joiError);
    }
    // validation successful
    req.body = value;
    return next();
};

export default schemaValidator;
