import { useEffect, useState } from "react";
import { IconUserCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../interceptors/axiosInterceptor.ts";

interface User {
    _id: string;
    name: string;
    email: string;
}

const UserCard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [activePage, setActivePage] = useState(1);
    const pageSize = 12;
    const token = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get(
                    "/user/get-all-user",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUsers(response.data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [token]);

    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = users.slice(startIndex, endIndex);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1">
                {users.length === 0 && <div>No users found.</div>}

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-6 justify-items-center">
                    {paginatedUsers.map((user) => (
                        <div
                            key={user._id}
                            className="flex flex-col items-center text-center border rounded-lg bg-white p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-xs"
                        >
                            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mb-4 sm:mb-6">
                                <IconUserCircle size={30} />
                            </div>

                            <h2 className="font-semibold text-lg text-gray-800 mb-1 break-words">
                                {user.name}
                            </h2>

                            <p className="text-sm text-gray-600 mb-4 break-words">{user.email}</p>

                            <button
                                onClick={() => navigate(`/admin/tasks/user/${user._id}`)}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors w-full"
                            >
                                View Tasks
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {users.length > pageSize && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
                    <div className="flex justify-center items-center gap-1 py-4 px-4">
                        <button
                            onClick={() => setActivePage(Math.max(1, activePage - 1))}
                            disabled={activePage === 1}
                            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {Array.from({ length: Math.ceil(users.length / pageSize) }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => setActivePage(pageNum)}
                                className={`flex items-center justify-center w-10 h-10 rounded-lg border font-medium text-sm transition-colors ${
                                    activePage === pageNum
                                        ? 'bg-purple-800 border-purple-800 text-white shadow-sm'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {pageNum}
                            </button>
                        ))}

                        <button
                            onClick={() => setActivePage(Math.min(Math.ceil(users.length / pageSize), activePage + 1))}
                            disabled={activePage === Math.ceil(users.length / pageSize)}
                            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCard;