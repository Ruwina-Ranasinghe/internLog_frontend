import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface TaskStatusData {
    name: string;
    value: number;
    color: string;
}

interface AdminAnalysisGraphProps {
    data: TaskStatusData[];
    height?: number;
    innerRadius?: number;
    outerRadius?: number;
}

const AdminAnalysisGraph: React.FC<AdminAnalysisGraphProps> = ({
                                                                   data,
                                                                   height = 250,
                                                                   innerRadius = 70,
                                                                   outerRadius = 100,
                                                               }) => {
    console.log("AdminAnalysisGraph received data:", data);

    const totalTasks = data.reduce((sum, item) => sum + item.value, 0);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            const percentage = totalTasks > 0 ? ((data.value / totalTasks) * 100).toFixed(1) : 0;
            return (
                <div className="bg-white p-2 border border-gray-300 rounded shadow">
                    <p className="font-semibold" style={{ color: data.payload.color }}>
                        {data.name}: {data.value}
                    </p>
                    <p className="text-sm text-gray-600">{percentage}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white border-2 border-[#B453F5] rounded-lg shadow-md p-6 w-full md:w-96 h-96">
            <h3 className="text-purple-600 font-semibold text-center mb-4">
                Overall Task Status
            </h3>

            <div style={{ height: `${height}px` }} className="mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={innerRadius}
                            outerRadius={outerRadius}
                            paddingAngle={0}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="text-center mb-4">
                <span className="text-lg font-medium text-gray-700">
                    Total Tasks: {totalTasks}
                </span>
            </div>
        </div>
    );
};

export default AdminAnalysisGraph;