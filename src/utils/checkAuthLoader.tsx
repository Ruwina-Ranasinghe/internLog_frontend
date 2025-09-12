import { redirect } from "react-router-dom";

interface LoaderOptions {
    allowedRoles?: string[];
}

export const checkAuthLoader =
    ({ allowedRoles }: LoaderOptions = {}) =>
        async () => {
            const token = localStorage.getItem("accessToken");
            const isAdmin = localStorage.getItem("isAdmin");

            if (!token) {
                return redirect("/login");
            }

            const role = isAdmin === "true" ? "admin" : "user";

            if (allowedRoles && !allowedRoles.includes(role)) {
                return redirect("/login");
            }

            return null;
        };
