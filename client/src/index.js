import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./providers/usercontext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ChakraProvider>
            <UserProvider>
                <AppRouter />
            </UserProvider>
        </ChakraProvider>
    </React.StrictMode>
);
