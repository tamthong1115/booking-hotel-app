import Joi from "joi";
import schemaValidator from "@middlewares/schemaValidator";

const PASSWORD_REGEX = new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$");

const authRegister = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required(),
    confirmPassword: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .label("Confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
});

const authLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required(),
});

const forgetPassword = Joi.object({
    email: Joi.string().email().required(),
});

const resetPassword = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required(),
    confirmPassword: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .label("Confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
});

export const registerValidator = schemaValidator(authRegister);
export const loginValidator = schemaValidator(authLogin);
export const forgetPasswordValidator = schemaValidator(forgetPassword);
export const resetPasswordValidator = schemaValidator(resetPassword);
