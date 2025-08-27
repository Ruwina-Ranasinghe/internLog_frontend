import TaskCard from "../../../components/userTaskCard";

const ViewAllTasks = () => {
    return (
        <div>
            <div className="pb-7 text-2xl font-bold" style={{ color: "#1f2937" }}>
                 My All Tasks
            </div>
            <TaskCard />
        </div>
    );
};

export default ViewAllTasks;
