import { useForm } from "react-hook-form";
import { sendPasswordMail } from "../../ApiClient/api-client";
import { useToast } from "../../context/ToastContext";

type ForgetPasswordFormData = {
    email: string;
};

const ForgetPassword = () => {
    const { showToast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgetPasswordFormData>();

    // use useMutation hook to send notification
    const onSubmit = async (data: ForgetPasswordFormData) => {
        try {
            await sendPasswordMail(data);
            showToast({ message: "Check your notification to reset password", type: "SUCCESS" });
        } catch (error) {
            console.error("ForgetPassword error:", error);
            showToast({ message: "Error sending notification", type: "ERROR" });
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
                <h1 className="text-2xl font-semibold">Forget Password</h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="rounded-md border border-gray-300 p-2"
                    {...register("email", { required: true })}
                />
                {errors.email && <span className="text-red-500">Email is required</span>}
                <button type="submit" className="rounded-md bg-blue-500 p-2 text-white">
                    Send Email
                </button>
            </form>
        </div>
    );
};

export default ForgetPassword;
