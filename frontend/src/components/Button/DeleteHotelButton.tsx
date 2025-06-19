import { useMutation, useQueryClient } from "react-query";
import LoadingComponent from "../Loading/Loading.tsx";
import { useNavigate } from "react-router-dom";
import { deleteHotelById } from "../../../ApiClient/api-hotels.ts";
import { useToast } from "../../../app/context/ToastContext.tsx";

type Props = {
    hotelId: string;
};

const DeleteHotelButton = ({ hotelId }: Props) => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: deleteHotel, isLoading } = useMutation(deleteHotelById, {
        onSuccess: () => {
            showToast({ message: "Hotel Deleted!", type: "SUCCESS" });
            navigate("/my-hotels");
            // This will refresh the MyHotels page
            queryClient.invalidateQueries("fetchMyHotels"); // from MyHotels.tsx
        },
        onError: (error: Error) => {
            showToast({
                message: error.message ? error.message : "Hotel deletion failed!",
                type: "ERROR",
            });
        },
    });

    const handleDelete = () => {
        deleteHotel(hotelId);
    };

    if (isLoading) return LoadingComponent({ isLoading });

    return (
        <button
            onClick={handleDelete}
            className="flex rounded bg-red-600 p-2 text-xl font-bold text-white hover:bg-red-500"
        >
            Delete
        </button>
    );
};

export default DeleteHotelButton;
