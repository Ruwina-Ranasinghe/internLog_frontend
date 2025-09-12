import { useEffect, useState } from "react";
import TaskStatusChart from "../../../components/pieChart";
import TaskStatusCards from "../../../components/taskStatusCard";
import axiosInstance from "../../../interceptors/axiosInterceptor.ts";

const UserDashboard = () => {
    const [counts, setCounts] = useState({ completed: 0, inProgress: 0, todo: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTaskCounts = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) return alert("Please login first");

            try {
                const res = await axiosInstance.get("/tasks/status-counts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = res.data; // axios parses JSON automatically
                console.log("API response:", data);

                setCounts(data.data);
            } catch (err: any) {
                console.error("Failed to fetch task counts:", err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTaskCounts();
    }, []);

    if (loading) return <div className="p-4">Loading dashboard...</div>;

    return (

        <div>
            <div>
                 <TaskStatusChart completed={counts.completed} inProgress={counts.inProgress} todo={counts.todo} height={240} innerRadius={80} outerRadius={110}/>
            </div>
            <div className="mt-9">
                 <TaskStatusCards completed={counts.completed} inProgress={counts.inProgress} todo={counts.todo} />
            </div>


        </div>

    )
}

export default UserDashboard;