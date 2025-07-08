import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Buttons from "../../../components/Buttons";
import { signIn } from "../../../services/api/api-users.ts";
import { useToast } from "../../../app/context/ToastContext.tsx";
import { LoginInputDTO } from "@shared/types/types.ts";

const SignIn = () => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const location = useLocation();

    // for reading error from google auth
    const params = new URLSearchParams(location.search);
    const oauthError = params.get("error");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputDTO>({
        mode: "onBlur",
    });

    const mutation = useMutation(signIn, {
        onSuccess: async () => {
            showToast({ message: "Sign in Successful!", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken"); // from isError AppContext
            // console.dir(location.state);
            navigate(location.state?.from?.pathname || "/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <div className="flex flex-col items-center justify-center px-3 py-4 lg:py-0">
            <div className="w-full rounded-lg shadow-lg sm:max-w-md md:mt-0 xl:p-0">
                {oauthError && <div className="mb-4 rounded  px-4 py-3 text-red-700">{oauthError}</div>}
                <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                    <div className="flex items-center justify-between my-1 mb-7">
                        <h1 className="text-[26px] font-normal text-[#333] cursor-pointer">Sign In</h1>{" "}
                        <Link to="/register">
                            <h4 className="text-[16px] font-normal cursor-pointer text-red-500">Register</h4>
                        </Link>
                    </div>
                    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
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
                        <div className="mt-4">
                            <div className="flex justify-end">
                                <Link to="/forget-password" className="text-red-500 text-sm">
                                    Forgot password
                                </Link>
                            </div>
                        </div>
                        {/* rgba(249, 52, 52, 0.5) */}
                        <span className="flex justify-center">
                            <div className="mt-5 flex items-center justify-end">
                                <Buttons className="min-w-[142px] h-10 text-base p-0 font-medium border-none outline-none text-white flex items-center leading-none justify-center rounded bg-[rgba(249,52,52,0.5)] mr-4 hover:bg-[rgba(249,52,52,1)]">
                                    Login
                                </Buttons>
                            </div>
                        </span>
                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="mx-3 text-gray-500 text-sm">Or sign in with</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                className="flex items-center  rounded bg-white border p-7 shadow hover:border-blue-400"
                                onClick={() => {
                                    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin;
                                    window.location.href = `${apiBaseUrl}/api/auth/google`;
                                }}
                            >
                                <img
                                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                    alt="Google"
                                    className="w-8 h-8"
                                />
                            </button>
                        </div>
                        <div className="text-sm dark:text-gray-400">
                            Not registered?{" "}
                            <a
                                href="/register"
                                className="dark:text-primary-500 font-medium text-blue-600 hover:underline"
                            >
                                Sign up
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
