import "express";
import { UserModelType } from "../../src/type/models/userType";

declare global {
    namespace Express {
        interface Request {
            user_backend?: UserModelType;
        }
    }
}
