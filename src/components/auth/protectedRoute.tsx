import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const role = isAdmin === "true" ? "admin" : "user";

    if (!allowedRoles.includes(role)) {
        return <Navigate to="*" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
