import { useEffect, useState } from "react";
import WebHeader from "../../../components/webHeader.tsx";
import SidebarAdmin from "../../../components/sidebarAdmin.tsx";
import BarChartComponent from "../../../components/barGraph.tsx";
import AdminAnalysisGraph from "../../../components/adminAnalysisGraph.tsx";

const AdminDashboard = () => {
    const [completionRate, setCompletionRate] = useState(0);
    const [priorityData, setPriorityData] = useState([
        { priority: "High", tasks: 0 },
        { priority: "Medium", tasks: 0 },
        { priority: "Low", tasks: 0 },
    ]);
    const [statusData, setStatusData] = useState([
        { name: "Completed", value: 0, color: "#22C55E" },
        { name: "In Progress", value: 0, color: "#EF4444" },
        { name: "Todo", value: 0, color: "#A855F7" },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPriorityData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return alert("Please login first");

            try {
                const res = await fetch("http://localhost:5000/api/tasks/priority-counts", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();

                if (res.ok) {
                    setPriorityData([
                        { priority: "High", tasks: data.data.High || 0 },
                        { priority: "Medium", tasks: data.data.Medium || 0 },
                        { priority: "Low", tasks: data.data.Low || 0 },
                    ]);
                } else {
                    console.error("Priority API Error:", data.error);
                }
            } catch (err) {
                console.error("Priority Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        const fetchStatusData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return alert("Please login first");

            try {
                const statusRes = await fetch("http://localhost:5000/api/tasks/all-users-status-counts", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const statusData = await statusRes.json();

                if (statusRes.ok) {
                    const completed = statusData.data.completed || 0;
                    const inProgress = statusData.data.inProgress || 0;
                    const todo = statusData.data.todo || 0;

                    const total = completed + inProgress + todo;
                    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

                    setStatusData([
                        { name: "Completed", value: completed, color: "#22C55E" },
                        { name: "In Progress", value: inProgress, color: "#EF4444" },
                        { name: "Todo", value: todo, color: "#A855F7" },
                    ]);
                    setCompletionRate(rate);
                } else {
                    console.error("Status API Error:", statusData.error);
                }
            } catch (err) {
                console.error("Status Fetch Error:", err);
            }
        };

        fetchPriorityData();
        fetchStatusData();
    }, []);

    if (loading) return <div className="p-4">Loading dashboard...</div>;

    return (
        <div>
            <WebHeader/>
            <div className="flex">
                <SidebarAdmin />
                <div className="flex-1 ml-0 md:ml-64 mt-14 sm:mt-16 md:mt-20 lg:mt-24 p-4 overflow-y-auto flex justify-center">
                    <div className="lg:p-10 lg:pt-50 p-3 pt-10">
                        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-24">
                            <div className="flex-1">
                                <BarChartComponent data={priorityData}/>
                            </div>
                            <div className="flex-1">
                                <AdminAnalysisGraph data={statusData} />
                            </div>
                        </div>
                        <div className="flex justify-center pt-12">
                            <div className="bg-white rounded-lg shadow-lg px-6 py-4 text-2xl font-semibold text-[#B453F5]">
                                Total Task Completion Rate : {completionRate}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
