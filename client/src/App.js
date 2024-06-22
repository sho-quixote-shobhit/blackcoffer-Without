import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Main from './components/Dashboard/Main';
import AuthPage from './components/Login/AuthPage';
import { useUser } from './providers/usercontext';

const PrivateRoute = ({ children }) => {
    const { user } = useUser();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
};

const AuthRoute = ({ children }) => {
    const { user } = useUser();
    const location = useLocation();

    if (user) {
        return <Navigate to="/dashboard" state={{ from: location }} />;
    }

    return children;
};

const AppRouter = () => {
    const { setuser } = useUser();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setuser(JSON.parse(storedUser));
        }
    }, [setuser]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<PrivateRoute><Main /></PrivateRoute>} />
                <Route path="/" element={<AuthRoute><AuthPage /></AuthRoute>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
