import { useMutation } from "react-query";
import ManageHotelForm from "../../../forms/ManageHotelForm/MangaHotelForm.tsx";
import { useNavigate } from "react-router-dom";
import { addMyHotel } from "../../../services/api/api-hotels.ts";
import { useToast } from "../../../app/context/ToastContext.tsx";

const AddHotel = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(addMyHotel, {
        onSuccess: () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS" });
            if (!isLoading) navigate("/my-hotels");
        },
        onError: (error: Error) => {
            showToast({
                message: error.message ? error.message : "Hotel save failed!",
                type: "ERROR",
            });
        },
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };

    return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
