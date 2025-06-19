import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { validateTokenUser, getUserRoles } from "../ApiClient/api-users.ts";
import { ToastProvider } from "./ToastContext.tsx";
// import LoadingComponent from "../components/Loading/Loading.tsx";
const STRIPE_PUBLIC_KEY = (import.meta.env.VITE_STRIPE_PUBLIC_KEY as string) || "";

// type ToastMessage = {
//     message: string;
//     type: "SUCCESS" | "ERROR";
// };

type AppContext = {
    isLoggedIn: boolean;
    roles: string[];
    stripePromise: Promise<Stripe | null>;
    loading: boolean;
    roleLoading: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);

    const {
        data: user,
        isError,
        isLoading: authLoading,
    } = useQuery("validateToken", validateTokenUser, {
        retry: false,
        onSettled: () => setLoading(false),
    });

    const { data: userRoles, isLoading: roleLoading } = useQuery("userRoles", getUserRoles, {
        enabled: !!user,
    });

    return (
        <AppContext.Provider
            value={{
                isLoggedIn: !isError,
                roles: userRoles || [],
                stripePromise,
                loading: loading || authLoading,
                roleLoading,
            }}
        >
            <ToastProvider>{children}</ToastProvider>
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within a AppContextProvider");
    }
    return context as AppContext;
};
