import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../app/context/AppContext.tsx";
import LoadingComponent from "./Loading/Loading.tsx";

interface ProtectedRouteProps {
    requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRoles = [] }) => {
    const { isLoggedIn, roles, roleLoading, loading } = useAppContext();

    if (roleLoading || loading) {
        return <LoadingComponent isLoading={true} />;
    }

    const hasRequiredRoles = requiredRoles.every((role) => roles.includes(role));

    console.log(`isLoggedIn: ${isLoggedIn}, hasRequiredRoles: ${hasRequiredRoles}`);

    return isLoggedIn && hasRequiredRoles ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
