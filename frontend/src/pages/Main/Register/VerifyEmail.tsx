import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../../ApiClient/api-client.ts";
import { useQuery } from "react-query";
import LoadingComponent from "../../components/Loading/Loading.tsx";

const VerifyEmail = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    const { data, error, isLoading } = useQuery(["verify-notification", token], () => verifyEmail(token as string));

    if (isLoading) {
        return LoadingComponent({ isLoading: true });
    }

    if (error) {
        return <div>Error verifying email</div>;
    }

    return (
        <div className="flex min-h-full items-center justify-center">
            <div className="text-center">
                <div className="pb-10 text-xl font-semibold">{data?.message}</div>
                <button
                    className="rounded border-slate-300 bg-blue-500 p-4 text-2xl hover:bg-blue-700"
                    onClick={() => navigate("/sign-in")}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default VerifyEmail;
