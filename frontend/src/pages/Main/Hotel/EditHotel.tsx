import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ManageHotelForm from "../../../forms/ManageHotelForm/MangaHotelForm.tsx";
import { fetchMyHotelById, updateMyHotelById } from "../../../services/api/api-hotels.ts";
import { useToast } from "../../../app/context/ToastContext.tsx";

const EditHotel = () => {
    const { hotelId } = useParams();
    const { showToast } = useToast();

    const navigate = useNavigate();

    const { data: hotel } = useQuery("fetchMyHotelById", () => fetchMyHotelById(hotelId || ""), {
        enabled: !!hotelId, // only run when hotel valid
    });

    const { mutate, isLoading } = useMutation(updateMyHotelById, {
        onSuccess: () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS" });
            navigate("/my-hotels");
        },
        onError: () => {
            showToast({ message: "Error Saving Hotel", type: "ERROR" });
        },
    });
    /*
        The hotel object is passed to the ManageHotelForm component as a prop.
        The ManageHotelForm component uses the useForm hook from react-hook-form to manage the form state.
        The form state is initialized with the hotel object when the component mounts.
        The form state is updated when the user interacts with the form.
        When the user submits the form, the form data is extracted from the form state and passed to the onSave prop function.
        The onSave function is responsible for calling the API to save the hotel data.
        The API call is made using the fetch API, and the hotel data is sent as a FormData object.
        The API response is handle in the onSave function, and the user is notified of the result using a toast notification.
        */
    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };

    return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />;
};

export default EditHotel;
