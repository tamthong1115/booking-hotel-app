import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { ReviewType, UserType } from "../../../../../backend/shared/types.ts";
import LoadingComponent from "../../components/Loading/Loading.tsx";
import { postNewReview } from "../../../ApiClient/api-reviews.ts";
import { useToast } from "../../../app/context/ToastContext.tsx";

type Props = {
    hotelId: string;
    currentUser: UserType | undefined;
};

const ReviewForm = ({ hotelId, currentUser }: Props) => {
    const { showToast } = useToast();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(postNewReview, {
        onSuccess: () => {
            showToast({ message: "Review Saved!", type: "SUCCESS" });
            queryClient.invalidateQueries("fetchReviews").then((r) => console.log(r));
        },

        onError: (err: Error) => {
            showToast({ message: err.message, type: "ERROR" });
        },
    });

    const { handleSubmit, register } = useForm<ReviewType>();

    const onSubmit = (data: ReviewType) => {
        const userName = (currentUser?.firstName || "") + " " + currentUser?.lastName;

        if (!userName.trim()) {
            showToast({ message: "User name is required", type: "ERROR" });
            return;
        }
        mutate({
            ...data,
            userName,
            hotelId,
        });
    };

    if (isLoading) {
        return LoadingComponent({ isLoading: true });
    }

    return (
        <div className="mt-20 py-20">
            <div className="container mx-auto my-6 flex flex-col md:my-24 md:flex-row">
                <div className="flex w-full flex-col p-8 lg:w-1/3">
                    <p className="ml-6 text-lg uppercase text-yellow-500">REVIEW</p>
                    <p className="my-4 text-3xl leading-relaxed md:text-5xl md:leading-snug">Leave us a feedback!</p>
                    <p className="text-sm leading-snug text-opacity-100 md:text-base">
                        Please provide your valuable feedback and something something ...
                    </p>
                </div>
                <div className="flex w-full flex-col justify-center lg:w-2/3">
                    <div className="container w-full px-4">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4 lg:w-6/12">
                                <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg">
                                    <div className="flex-auto p-5 lg:p-10">
                                        <h4 className="mb-4 text-2xl font-semibold text-black">Have a review?</h4>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="relative mb-3 w-full">
                                                <label className="mb-2 block text-xs font-bold uppercase text-gray-700">
                                                    Comment
                                                </label>

                                                <textarea
                                                    className="w-full rounded border-0 bg-gray-300 px-3 py-3 text-sm text-gray-800 placeholder-black shadow outline-none focus:bg-gray-400"
                                                    {...register("comment", { required: true })}
                                                />
                                            </div>

                                            <div className="relative mb-3 w-full">
                                                <label className="mb-2 block text-xs font-bold uppercase text-gray-700">
                                                    Rating
                                                </label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={5}
                                                    className="w-full rounded border-0 bg-gray-300 px-3 py-3 text-sm text-gray-800 placeholder-black shadow outline-none focus:bg-gray-400"
                                                    {...register("rating", {
                                                        required: true,
                                                        min: 1,
                                                        max: 5,
                                                    })}
                                                />
                                                <div className="mt-6 text-center">
                                                    <button
                                                        type="submit"
                                                        className="g-yellow-300 mx-auto mb-1 mr-1 rounded px-6 py-3 text-center text-sm font-bold uppercase text-black shadow outline-none hover:shadow-lg focus:outline-none active:bg-yellow-400"
                                                    >
                                                        Submit Review
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
