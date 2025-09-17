import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/404/errorPage";
import UserDashboard from "./pages/user/userDashboard";
import CreateTask from "./pages/user/createTask";
import ViewAllTasks from "./pages/user/viewAllTasks";
import EditTask from "./pages/user/editTask";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminLog from "./pages/admin/adminLog";
import UserLog from "./pages/admin/userLog";
import App from "./App.tsx";
import UserLayout from "./layouts/userLayout.tsx";
import AdminLayout from "./layouts/adminLayout.tsx";
import Home from "./pages/Home";
import {checkAuthLoader} from "./utils/checkAuthLoader.tsx";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },

            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },

            {
                path: "user",
                element: <UserLayout />,
                loader: checkAuthLoader({ allowedRoles: ["user"] }),
                children: [
                    { index: true, element: <Navigate to="dashboard" replace /> },
                    { path: "dashboard", element: <UserDashboard /> },
                    { path: "create-task", element: <CreateTask /> },
                    { path: "view-all-tasks", element: <ViewAllTasks /> },
                    { path: "edit-task/:id", element: <EditTask /> },
                ],
            },

            {
                path: "admin",
                element: <AdminLayout />,
                loader: checkAuthLoader({ allowedRoles: ["admin"] }),
                children: [
                    { index: true, element: <Navigate to="dashboard" replace /> },
                    { path: "dashboard", element: <AdminDashboard /> },
                    { path: "tasks/user/:id", element: <AdminLog /> },
                    { path: "user-log", element: <UserLog /> },
                ],
            },

            { path: "*", element: <NotFound /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);