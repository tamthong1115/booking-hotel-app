import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ManageRoomForm, { RoomFormData } from "../../forms/RoomForm/RoomForm.tsx";
import { addNewRoom } from "../../../ApiClient/api-rooms.ts";
import { useToast } from "../../../app/context/ToastContext.tsx";

const AddRoom = () => {
    const { showToast } = useToast();
    const { hotelId } = useParams();
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(addNewRoom, {
        onSuccess: () => {
            showToast({ message: "Room Added!", type: "SUCCESS" });
            navigate(`/detail/${hotelId}`);
        },
        onError: () => {
            showToast({ message: "Error Adding Room", type: "ERROR" });
        },
    });

    const handleSave = (roomFormData: RoomFormData) => {
        mutate(roomFormData);
    };

    return <ManageRoomForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddRoom;
