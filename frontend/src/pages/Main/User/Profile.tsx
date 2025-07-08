import { useQuery } from "react-query";
import LoadingComponent from "../../../components/Loading/Loading.tsx";
import { fetchCurrentUser } from "../../../services/api/api-users.ts";

const Profile = () => {
    const { data: currentUser } = useQuery("fetchCurrentUser", fetchCurrentUser);

    if (!currentUser) {
        return LoadingComponent({ isLoading: true });
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <div>
                <h2 className="text-xl font-semibold">Name: {currentUser.firstName + " " + currentUser.lastName}</h2>
                <h2 className="text-xl font-semibold">Email: {currentUser.email}</h2>
            </div>
            <div></div>
        </div>
    );
};

export default Profile;
