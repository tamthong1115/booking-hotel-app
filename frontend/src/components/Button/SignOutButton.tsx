import { useMutation, useQueryClient } from "react-query";
import { signOut } from "../../../ApiClient/api-users.ts";
import { useToast } from "../../../app/context/ToastContext.tsx";
// import MenuUser from "../MenuUser/MenuUser.tsx";
// import classNames from "classnames/bind";
// import styles from "./index.module.scss";
// import { MENU_ITEMS } from "../../config/types.tsx";

// const cx = classNames.bind(styles);

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const mutation = useMutation(signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken"); // from isError AppContext
            await queryClient.invalidateQueries("validateTokenAdmin"); // from isAdmin AppContext
            showToast({ message: "Sign Out!", type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    const handleClick = () => {
        mutation.mutate();
    };
    return (
        <div className="" onClick={handleClick}>
            Sign Out
        </div>
    );
};

export default SignOutButton;
