import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import * as userClient from "../../../ApiClient/api-users.ts";

import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import Buttons from "../../components/Buttons";
import { useToast } from "../../../app/context/ToastContext.tsx";

const cx = classNames.bind(styles);

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const queryClient = useQueryClient();
    // const navigate = useNavigate();
    const { showToast } = useToast();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        mode: "onBlur", // trigger the validation when un-focus the input
    });

    const { mutate } = useMutation(userClient.register, {
        onSuccess: async () => {
            showToast({
                message: "Registration Successful! Check your notification to verify notification",
                type: "SUCCESS",
            });
            await queryClient.invalidateQueries("validateToken"); // from isError AppContext
        },
        onError: (error: Error) => {
            showToast({
                message: error.message ? error.message : "Register failed!",
                type: "ERROR",
            });
        },
    });

    const onSubmit = handleSubmit((data) => {
        // mutate make the post request
        mutate(data);
    });

    return (
        <div className={cx("form-register")}>
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                <div className={cx("header-title")}>
                    <h1 className={cx("heading")}>Create an Account</h1>
                    <Link to="/sign-in">
                        <h4 className={cx("switch-btn")}>Sign In</h4>
                    </Link>
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <label className="flex-1 text-sm font-bold text-gray-700">
                        <input
                            className="mb-2 w-full rounded border border-gray-400 px-2 py-1 font-normal"
                            placeholder="First Name"
                            {...register("firstName", {
                                required: "First name is required",
                                minLength: {
                                    value: 3,
                                    message: "The first name must be at least 3 character.",
                                },
                            })}
                        />
                        {errors.firstName && <span className="text-red-600">{errors.firstName.message}</span>}
                    </label>
                    <label className="flex-1 text-sm font-bold text-gray-700">
                        <input
                            className="mb-2 w-full rounded border border-gray-400 px-2 py-1 font-normal"
                            placeholder="Last Name"
                            {...register("lastName", {
                                required: "Last name is required",
                                minLength: {
                                    value: 3,
                                    message: "The last name must be at least 3 character.",
                                },
                            })}
                        />
                        {errors.lastName && <span className="text-red-600">{errors.lastName.message}</span>}
                    </label>
                </div>
                <label className="flex-1 text-sm font-bold text-gray-700">
                    <input
                        type="email"
                        className="mb-2 w-full rounded border border-gray-400 px-2 py-1 font-normal"
                        placeholder="Your email"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                </label>
                <label className="flex-1 text-sm font-bold text-gray-700">
                    <input
                        type="password"
                        className="mb-2 w-full rounded border border-gray-400 px-2 py-1 font-normal"
                        placeholder="Your password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 character",
                            },
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/,
                                message: "Password must contain one number, and one special character",
                            },
                        })}
                    />
                    {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                </label>
                <label className="flex-1 text-sm font-bold text-gray-700">
                    <input
                        type="password"
                        className="mb-2 w-full rounded border border-gray-400 px-2 py-1 font-normal"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                            validate: {
                                required: (val) => val !== "" || "Confirm Password is required",
                                matchPassword: (val) => val === watch("password") || "Passwords do not match",
                            },
                        })}
                    />
                    {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
                </label>
                <div className={cx("form-aside")}>
                    <p className={cx("policy-text")}>
                        By registering, you agree to Booking{" "}
                        <a href="" className={cx("policy-link")}>
                            Terms of Service
                        </a>{" "}
                        &{" "}
                        <a href="" className={cx("policy-link")}>
                            Privacy Policy
                        </a>
                    </p>
                </div>
                <span className={cx("controls")}>
                    <Buttons type="submit" text className={cx("btn", "btn-primary")}>
                        Register
                    </Buttons>
                    <Link to="/">
                        <Buttons text className={cx("btn")}>
                            Return
                        </Buttons>
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default Register;
