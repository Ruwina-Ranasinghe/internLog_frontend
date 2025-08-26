import { useEffect, useState } from "react";
import TaskStatusChart from "../../../components/pieChart";
import SidebarUser from "../../../components/sidebarUser";
import TaskStatusCards from "../../../components/taskStatusCard";
import WebHeader from "../../../components/webHeader";

const UserDashboard = () => {
    const [counts, setCounts] = useState({ completed: 0, inProgress: 0, todo: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTaskCounts = async () => {
            const token = localStorage.getItem("token");
            if (!token) return alert("Please login first");

            try {
                const res = await fetch("http://localhost:5000/api/tasks/status-counts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                console.log("API response:", data);

                if (res.ok) {
                    setCounts(data.data);
                } else {
                    console.error("Failed to fetch task counts:", data.error);
                }
            } catch (err) {
                console.error("Error fetching task counts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTaskCounts();
    }, []);

    if (loading) return <div className="p-4">Loading dashboard...</div>;

    return (

        <div>
            <WebHeader/>
            <div className="flex">
                <SidebarUser/>
                <div className="flex-1 ml-0 md:ml-64 mt-14 sm:mt-16 md:mt-20 lg:mt-24 p-4 overflow-y-auto">
                    <div className="lg:pt-3 p-10 pt-9">
                        <div>
                            <TaskStatusChart completed={counts.completed} inProgress={counts.inProgress} todo={counts.todo} height={240} innerRadius={80} outerRadius={110}/>
                        </div>
                        <div className="mt-9">
                            <TaskStatusCards completed={counts.completed} inProgress={counts.inProgress} todo={counts.todo} />
                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default UserDashboard;