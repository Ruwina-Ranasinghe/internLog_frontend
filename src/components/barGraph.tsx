import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface PriorityData {
    priority: string;
    tasks: number;
}

interface Props {
    data: PriorityData[];
}

const BarChartComponent = ({ data }: Props)  => {
    console.log("Chart received data:", data);
    return (
        <div className="bg-white border-2 border-[#B453F5] rounded-lg shadow-md p-6 w-full md:w-96 h-96 flex flex-col justify-center">
            <h3 className="text-purple-600 font-semibold text-center mb-4">
                Overall Task Priority
            </h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="priority" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#B453F5" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
