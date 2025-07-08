import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./app/context/AppContext.tsx";
import { SearchContextProvider } from "./app/context/SearchContext.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0, // the number retry to request if it failed
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppContextProvider>
                <SearchContextProvider>
                    <App />
                </SearchContextProvider>
            </AppContextProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
