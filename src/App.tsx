import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UserDashboard from "./pages/user/userDashboard";
import CreateTask from "./pages/user/createTask";
import ViewAllTasks from "./pages/user/viewAllTasks";
import EditTask from "./pages/user/editTask";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminLog from "./pages/admin/adminLog";
import NotFound from "./pages/404/errorPage";
import UserLog from "./pages/admin/userLog";
import ProtectedRoute from "./components/auth/protectedRoute.tsx";


const App = () => {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/user-dashboard" element={<ProtectedRoute allowedRoles={["user"]}><UserDashboard /></ProtectedRoute>} />
                <Route path="/create-task" element={<ProtectedRoute allowedRoles={["user"]}><CreateTask /></ProtectedRoute>} />
                <Route path="/view-all-tasks" element={<ProtectedRoute allowedRoles={["user"]}><ViewAllTasks /></ProtectedRoute>} />
                <Route path="/edit-task/:id" element={<ProtectedRoute allowedRoles={["user"]}><EditTask /></ProtectedRoute>} />
                <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/tasks/user/:id" element={<ProtectedRoute allowedRoles={["admin"]}><AdminLog /></ProtectedRoute>} />
                <Route path="/user-log" element={<ProtectedRoute allowedRoles={["admin"]}><UserLog /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </Router>
    );
};

export default App;

