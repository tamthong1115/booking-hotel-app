import { useForm } from "react-hook-form";
import { resetPassword } from "../../../ApiClient/api-client.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../app/context/ToastContext.tsx";

type ResetPasswordFormData = {
    password: string;
    confirmPassword: string;
    token: string;
};

const ResetPassword = () => {
    const { showToast } = useToast();
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>();

    const onSubmit = async (data: ResetPasswordFormData) => {
        data.token = token as string;
        if (data.password !== data.confirmPassword) {
            showToast({ message: "Passwords do not match", type: "ERROR" });
            return;
        }

        try {
            await resetPassword(data);
            showToast({ message: "Password reset OK", type: "SUCCESS" });
            navigate("/sign-in");
        } catch (error) {
            console.error("ResetPassword error:", error);
            showToast({ message: "Error resetting password", type: "ERROR" });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-12 flex w-64 flex-col space-y-4">
            <input
                type="password"
                placeholder="New Password"
                {...register("password", { required: true })}
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {errors.password && <span className="text-red-500">Password is required</span>}

            <input
                type="password"
                placeholder="Confirm New Password"
                {...register("confirmPassword", { required: true })}
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {errors.confirmPassword && <span className="text-red-500">Confirmation is required</span>}

            <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
                Reset Password
            </button>
        </form>
    );
};

export default ResetPassword;
