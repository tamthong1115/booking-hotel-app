import { createContext, useContext, ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
};

type ToastContextType = {
    showToast: (toastMessage: ToastMessage) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const showToast = ({ message, type }: ToastMessage) => {
        toast[type === "SUCCESS" ? "success" : "error"](message);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        style: {
                            background: "green",
                            color: "#fff",
                        },
                    },
                    error: {
                        style: {
                            background: "red",
                            color: "#fff",
                        },
                    },
                }}
            />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
