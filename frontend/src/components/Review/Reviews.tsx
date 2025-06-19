import { ReviewType } from "../../../../../backend/shared/types.ts";
import { useQuery } from "react-query";
import LoadingComponent from "../Loading/Loading.tsx";
import DeleteReviewButton from "../Button/DeleteReviewButton.tsx";
import { getReviews } from "../../../ApiClient/api-reviews.ts";

type Props = {
    hotelId: string;
    userId: string | undefined;
};

const Reviews = ({ hotelId, userId }: Props) => {
    const { data: reviews, isLoading } = useQuery("fetchReviews", () => getReviews(hotelId), {
        enabled: !!hotelId,
    });

    if (isLoading) {
        return LoadingComponent({ isLoading: true });
    }

    if (!reviews) {
        return <div>No reviews available</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <h2 className="col-span-full text-2xl font-bold">Reviews</h2>
            {reviews.map((review: ReviewType, index: number) => (
                <div key={index} className="flex justify-between rounded border bg-white p-4 shadow-sm">
                    <div>
                        <h3 className="mb-2 text-lg font-semibold">{review.userName}</h3>
                        <h3 className="mb-2 text-lg font-semibold">Rating: {review.rating}</h3>
                        <p className="text-gray-500">Comment: {review.comment}</p>
                    </div>

                    <div className="flex items-center justify-center">
                        {review.userId === userId && <DeleteReviewButton hotelId={hotelId} reviewId={review._id} />}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;
