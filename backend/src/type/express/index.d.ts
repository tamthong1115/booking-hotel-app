import "express";
import { UserModelType } from "../model/userType";

declare global {
    namespace Express {
        interface Request {
            user_backend?: UserModelType;
        }
    }
}
