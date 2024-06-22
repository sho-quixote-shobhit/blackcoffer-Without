import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Dashboard/Main";
import AuthPage from "./components/Login/AuthPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Main />} />
                <Route path="/" element={<AuthPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
