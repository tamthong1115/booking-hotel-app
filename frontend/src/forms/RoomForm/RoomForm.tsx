import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import DetailsSection from "./DetailsSection.tsx";
import { RoomType } from "../../../../../backend/shared/types.ts";

export type RoomFormData = {
    hotelId: string;
    name: string;
    roomType: string;
    description: string;
    pricePerNight: number;
};

type Props = {
    room?: RoomType;
    onSave: (roomData: RoomFormData) => void;
    isLoading: boolean;
};

const ManageRoomForm = ({ onSave, isLoading, room }: Props) => {
    const { hotelId } = useParams();
    const formMethods = useForm<RoomFormData>({
        mode: "onBlur",
        defaultValues: { hotelId },
    });
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        reset({ ...room, hotelId });
    }, [room, reset, hotelId]);

    const onSubmit = handleSubmit((data) => {
        onSave(data);
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={onSubmit}>
                <DetailsSection />
                <span className="flex justify-end">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="rounded bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500 disabled:bg-gray-600"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    );
};

export default ManageRoomForm;
